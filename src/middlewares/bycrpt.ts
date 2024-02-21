import bcrypt from 'bcrypt';

// =================================================================
//           Hash user plain password
// =================================================================
export const hashPasswordService = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

// =================================================================
//           Compare user password with existing
// =================================================================
export const comparePasswordService = async (
  password: string,
  dbPassword: string
) => {
  const isPasswordCorrect = await bcrypt.compare(password, dbPassword);
  return isPasswordCorrect
};
