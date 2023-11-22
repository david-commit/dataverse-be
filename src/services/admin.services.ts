import { db } from '../utils/db.server';

// =================================================================
//        GET: All Admins
// =================================================================
export const getAllAdmins = async () => {
  await db.admin.findMany({
    select: {
      id: true,
    },
  });
};

// =================================================================
//        GET: Single Admin
// =================================================================
export const getAdmin = async (adminID: number) => {
  await db.admin.findUnique({
    where: {
      id: adminID,
    },
  });
};

// =================================================================
//        POST: New Admin
// =================================================================
type AdminNewProfileType = {
  name: string;
  email: string;
  password: string;
  phone: string;
};

export const createAdmin = async (profile: AdminNewProfileType) => {
  const { name, email, password, phone } = profile;

  await db.admin.create({
    data: {
      name,
      email,
      password,
      phone,
    },
  });
};

// =================================================================
//        UPDATE: Existing Admin
// =================================================================
type AdminUpdateProfileType = {
  name: string;
  email: string;
  password: string;
  phone: string;
};

export const updateAdmin = async (profile: AdminUpdateProfileType) => {
  const { name, email, password, phone } = profile;

  await db.admin.update({
    where: {
      email,
    },
    data: {
      name,
      password,
      phone,
    },
  });
};
