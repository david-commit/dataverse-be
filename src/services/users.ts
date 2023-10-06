import { db } from '../utils/db.server';

type UserType = {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
};

// export const getUsers = async (): Promise<UserType> => {
//   return db.user.findMany({
//     select: {
//       id: true,
//       name: true,
//       email: true,
//       password: true,
//       phone: true,
//     },
//   });
// };
