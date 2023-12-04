import type { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { db } from '../utils/db.server';
import { generateTokenAndSetCookies } from '../middlewares/jwt';
import { hashPasswordService } from '../middlewares/bycrpt';
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
//        POST: New Admin / SIGNUP
// =================================================================
export const createAdmin = async (req: Request, res: Response) => {
  const profile = req.body;

  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  // Check if user already exists
  const adminExists = await db.admin.findUnique({
    where: {
      email: profile.email,
    },
  });

  // If profile exists, return error message
  if (adminExists) {
    return res.status(403).json({ msg: 'Profile already exists' });
  }

  // Hash plain password
  const hashedPassword = await hashPasswordService(profile.password);

  // Update profile with the hashed password
  const updatedProfile = { ...profile, password: hashedPassword };

  // Proceed to create admin profile
  const admin = await createAdminService(updatedProfile);

  // Generate token and set cookie response
  const tokenPayload = { id: admin.id, email: admin.email };
  generateTokenAndSetCookies(tokenPayload, res);

  return res.status(201).json({
    payload: {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      phone: admin.phone,
    },
  });
};

// =================================================================
//        UPDATE: Existing Admin
// =================================================================
export const updateAdmin = async (req: Request, res: Response) => {
  const profile = req.body;
  const { adminID } = req.params;

  // Check if admin exists
  const adminExists = await getAdminService(parseInt(adminID));

  // End function if admin doesn't exist
  if (!adminExists) {
    return res.status(403).json({ msg: 'Forbidden action' });
  }

  // Proceed updating since admin exists
  const admin = await updateAdminService(profile);

  if (!admin) {
    return res.status(422).json({ msg: 'Unprocessable entity' });
  }
  return res.status(202).json(admin);
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
  return res.status(204).json({ msg: 'Profile deleted successfully' });
};
