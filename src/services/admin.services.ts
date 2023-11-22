import { db } from '../utils/db.server';

// =================================================================
//        GET: All Admins
// =================================================================
export const getAllAdminsService = async () => {
  await db.admin.findMany({
    select: {
      id: true,
    },
  });
};

// =================================================================
//        GET: Single Admin
// =================================================================
export const getAdminService = async (adminID: number) => {
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

export const createAdminService = async (profile: AdminNewProfileType) => {
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

export const updateAdminService = async (profile: AdminUpdateProfileType) => {
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
