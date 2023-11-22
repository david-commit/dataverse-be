import type { Request, Response } from 'express';
import {
  getAllAdminsService,
  getAdminService,
  createAdminService,
  updateAdminService,
} from '../services/admin.services';

// =================================================================
//        GET: All Admins
// =================================================================
export const getAllAdmins = async (req: Request, res: Response) => {
  try {
    const admins = await getAllAdminsService();
    return res.status(200).json(admins);
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

// =================================================================
//        GET: Single Admin
// =================================================================
export const getAdmin = async (req: Request, res: Response) => {
  const { adminID } = req.params;

  try {
    const admin = await getAdminService(parseInt(adminID));
    return res.status(200).json(admin);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

// =================================================================
//        POST: New Admin
// =================================================================
export const createAdmin = async (req: Request, res: Response) => {
  const profile = req.body;

  try {
    const admin = await createAdminService(profile);
    return res.status(200).json(admin);
  } catch (error) {
    return res.status(422).json(error.message);
  }
};

// =================================================================
//        UPDATE: Existing Admin
// =================================================================
export const updateAdmin = async (req: Request, res: Response) => {
  const profile = req.body;

  try {
    const admin = await updateAdminService(profile);
    return res.status(200).json(admin);
  } catch (error) {
    return res.status(422).json(error.message);
  }
};
