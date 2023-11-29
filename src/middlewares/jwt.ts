import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const hashPasswordService = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

// =================================================================
//           Generate a token and attach it to the response header
// =================================================================
type profilePayloadDataType = {
  id: number;
  email: string;
};

export const generateTokenAndSetCookies = (
  profileData: profilePayloadDataType,
  res: Response
) => {
  const SECRET = process.env.SECRET;

  // Create token from payload
  const token = jwt.sign(profileData, SECRET, {
    expiresIn: '1d',
  });

  // Attach token to response header
  res.cookie('accessToken', token, {
    httpOnly: true,
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    sameSite: 'strict',
    secure: true,
  });

  return token
};
