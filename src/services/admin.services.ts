import { db } from '../utils/db.server';

// =================================================================
//        GET: All Admins
// =================================================================
export const getAllAdminsService = async () => {
  return await db.admin.findMany({
    select: {
      id: true,
      email: true,
      phone: true,
    },
  });
};

// =================================================================
//        GET: Single Admin
// =================================================================
export const getAdminService = async (adminID: number) => {
  return await db.admin.findUnique({
    where: {
      id: adminID,
    },
    select: {
      id: true,
      email: true,
      phone: true,
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

  return await db.admin.create({
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

  return await db.admin.update({
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

// =================================================================
//        DELETE: Existing Admin
// =================================================================
type AdminDeleteType = {
  email: string;
};

export const deleteAdminService = async (profile: AdminDeleteType) => {
  const { email } = profile;

  return await db.admin.delete({
    where: {
      email,
    },
  });
};
