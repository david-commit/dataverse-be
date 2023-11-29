import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const hashPasswordService = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

