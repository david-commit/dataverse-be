import { Request, Response, NextFunction } from 'express';
import jwt, { VerifyErrors, JwtPayload } from 'jsonwebtoken';
const SECRET = process.env.SECRET;

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
  const token = req.headers['authorization'];
  console.log(token);

  // End function if token is unavailablr
  if (!token) {
    return res
      .status(401)
      .json({ message: 'Authentication failed: No token provided' });
  }

  // Verify token
  const verifiedToken = jwt.verify(token, process.env.SECRET);

  if (!verifiedToken) {
    return res
      .status(403)
      .json({ msg: 'Authentication failed: Invalid token' });
  }

  next();
};
