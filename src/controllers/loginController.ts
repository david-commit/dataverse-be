import { Request, Response } from 'express';
import { getAdminServiceByEmail } from '../services/admin.services';
import { comparePasswordService } from '../middlewares/bycrpt';
import { generateTokenAndSetCookies } from '../middlewares/jwt';

// =================================================================
//        POST: LOGIN
// =================================================================
export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Check is admin exists
  const adminExists = await getAdminServiceByEmail(email);

  // If profile doesn't exist, return error message
  if (!adminExists) {
    return res.status(403).json({ msg: 'Invalid email or password' });
  }

  // Compare input password to db password
  const isPasswordCorrect = await comparePasswordService(
    password,
    adminExists.password
  );

  // If passwords dont match, return error message
  if (!isPasswordCorrect) {
    return res.status(403).json({ msg: 'Invalid email or password' });
  }

  // Generate token and set cookie response
  const tokenPayload = { id: adminExists.id, email: adminExists.email };
  generateTokenAndSetCookies(tokenPayload, res);

  // Extract data to send back to client
  const profile = {
    id: adminExists.id,
    email: adminExists.email,
    phone: adminExists.phone,
  };

  return res.status(200).json(profile);
};
