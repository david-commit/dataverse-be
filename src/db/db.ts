import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const postTestData = async () => {
  const post = await prisma.user.create({
    data: {
      email: 'david@gmail.com',
      name: 'David',
      password: 'halloha',
      phone: '071425896',
    },
  });
  console.log(post);
};

