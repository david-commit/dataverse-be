import { Request, Response } from 'express';
import { getAdminServiceByEmail } from '../services/admin.services';
import { generateToken } from '../middlewares/jwt';
const FRONTEND_URL = process.env.FRONTEND_URL;
const SECRET = process.env.SECRET;

// =================================================================
//        POST: Forgot Password (Send token to user email)
// =================================================================
export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  console.log(email)

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

  // Form link to send to user via email
  const resetLink = `${FRONTEND_URL}/forgot-password/${adminExists.id}/${token}`;
  console.log(resetLink);

  return res.status(200).json({ link: resetLink });
};

// =================================================================
//        POST: Reset user provided password
// =================================================================
export const resetPassword = async (req: Request, res: Response) => {
  const { email, newPassword } = req.body;

  // Check is admin exists
  const adminExists = await getAdminServiceByEmail(email);

  // If profile doesn't exist, return error message
  if (!adminExists) {
    return res.status(500).json({ msg: 'Password could not be updated' });
  }
};
