import bcrypt from 'bcrypt';

// =================================================================
//           Hash user plain password
// =================================================================
export const hashPasswordService = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

