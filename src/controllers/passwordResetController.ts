import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import {
  getAdminServiceByEmail,
  updateAdminService,
} from '../services/admin.services';
import { generateToken } from '../middlewares/jwt';
import { getAdminService } from '../services/admin.services';
const FRONTEND_URL = process.env.FRONTEND_URL;
const SECRET = process.env.SECRET;

// =================================================================
//        POST: Forgot Password (Send token to user email)
// =================================================================
export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  // Check is admin exists
  const adminExists = await getAdminServiceByEmail(email);

  // If profile doesn't exist, return error message
  if (!adminExists) {
    return res.status(422).json({ msg: 'Invalid email address' });
  }

  // Proceed to generate a token and embed to link
  const tokenPayload = {
    id: adminExists.id,
    email: adminExists.email,
  };

  // Create a new temporary SECRET with existing password
  // Token will be invalid once password is changed, thus a One Time Token
  const tempSecret = SECRET + adminExists.password;

  // Generate token with the new temporary SECRET
  const token = await generateToken(tokenPayload, tempSecret);

  // Convert the token to a Base64-encoded string
  const encodedToken = Buffer.from(token).toString('base64');

  // Form link to send to user via email
  const resetLink = `${FRONTEND_URL}/reset-password/${adminExists.id}/${encodedToken}`;
  console.log(resetLink);

  return res.status(200).json({ link: resetLink });
};

// =================================================================
//        POST: Reset db password with user provided password
// =================================================================
export const resetPassword = async (req: Request, res: Response) => {
  const { id, decodedToken, password } = req.body;

  // Check if user exists - Find the user by ID
  const adminExists = await getAdminService(parseInt(id));

  // If user ID doesn't exist, end the function
  if (!adminExists) {
    return res.status(403).json({ msg: 'User ID not found' });
  }

  // Recreate the temporary secret used to sign the token
  const tempSecret = SECRET + adminExists.password;

  // Verify provided token, function ends if token isn't valid
  const validToken = jwt.verify(decodedToken, tempSecret);

  // End function if token is valid
  if (!validToken) {
    return res
      .status(403)
      .json({ msg: 'Authentication failed: Invalid token' });
  }

  // Proceed to update user password
  const updatePayload = {
    email: adminExists.email,
    password,
  };
  const resetUserPassword = updateAdminService(updatePayload);

  return res.status(204).json(resetUserPassword)
};
