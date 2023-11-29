import { Request, Response } from 'express';
import { getAdminServiceByEmail } from '../services/admin.services';

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
};
