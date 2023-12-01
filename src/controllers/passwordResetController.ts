import { Request, Response } from 'express';
import { getAdminServiceByEmail } from '../services/admin.services';
import { generateTokenAndSetCookies } from '../middlewares/jwt';

// =================================================================
//        POST: Forgot Password (Send token to user email)
// =================================================================
export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  // Check is admin exists
  const adminExists = await getAdminServiceByEmail(email);

  // If profile doesn't exist, return error message
  if (!adminExists) {
    return res.status(500).json({ msg: 'Server error' });
  }
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
