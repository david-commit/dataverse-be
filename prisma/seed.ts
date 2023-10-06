import { db } from '../src/utils/db.server';
import { userData } from './seedData';

type UserType = {
  name: string;
  email: string;
  password: string;
  phone: string;
};

const seed = async () => {
  // Seed Users
  await Promise.all(
    userData.map((user: UserType) => {
      return db.user.create({
        data: {
          name: user.name,
          email: user.email,
          password: user.password,
          phone: user.phone,
        },
      });
    })
  );

  // Seed
};

seed();
