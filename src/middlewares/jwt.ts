import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

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

  return token;
};

// =================================================================
//        Middleware to verify the client token is valid
// =================================================================
export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get accessToken cookie from request
  const accessToken = req.cookies;
  console.log(accessToken);

  // End function if token is unavailablr
  if (!accessToken) {
    return res.status(403).json({ msg: 'Invalid token' });
  }

  // Verify token
  const verifiedToken = jwt.verify(accessToken, process.env.SECRET);

  next();
};
