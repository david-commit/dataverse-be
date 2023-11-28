import type { Request, Response } from 'express';
import {
  getAllAdminsService,
  getAdminService,
  createAdminService,
  updateAdminService,
  deleteAdminService,
} from '../services/admin.services';

// =================================================================
//        GET: All Admins
// =================================================================
export const getAllAdmins = async (req: Request, res: Response) => {
  const admins = await getAllAdminsService();

  if (!admins) {
    return res.status(404).json({ msg: 'No users found' });
  }
  return res.status(200).json(admins);
};

// =================================================================
//        GET: Single Admin
// =================================================================
export const getAdmin = async (req: Request, res: Response) => {
  const { adminID } = req.params;

  const admin = await getAdminService(parseInt(adminID));

  if (!admin) {
    return res.status(404).json({ msg: 'User not found' });
  }
  return res.status(200).json(admin);
};

// =================================================================
//        POST: New Admin
// =================================================================
export const createAdmin = async (req: Request, res: Response) => {
  const profile = req.body;

  const admin = await createAdminService(profile);

  if (!admin) {
    return res.status(422).json({ msg: 'Validation errors' });
  }
  return res.status(200).json(admin);
};

// =================================================================
//        UPDATE: Existing Admin
// =================================================================
export const updateAdmin = async (req: Request, res: Response) => {
  const profile = req.body;

  // Check if admin exists
  const adminExists = await getAdminService(parseInt(profile.id));

  // End function if admin doesn't exist
  if (!adminExists) {
    return res.status(403).json({ msg: 'Forbidden action' });
  }

  // Proceed updating since admin exists
  const admin = await updateAdminService(profile);

  if (!admin) {
    return res.status(422).json({ msg: 'Unprocessable entity' });
  }
  return res.status(200).json(admin);
};

// =================================================================
//        Delete: Existing Admin
// =================================================================
export const deleteAdmin = async (req: Request, res: Response) => {
  const { adminID } = req.params;

  // Check if admin exists
  const adminExists = await getAdminService(parseInt(adminID));

  // End function if admin doesn't exist
  if (!adminExists) {
    return res.status(403).json({ msg: 'Forbidden action' });
  }

  // Proceed deleting since admin exists
  const admin = await deleteAdminService(parseInt(adminID));

  if (!admin) {
    return res.status(500).json({ msg: 'Profile could not deleted' });
  }
  return res.status(200).json({ msg: 'Profile deleted successfully' });
};
