// =================================================================
//        Router Config
// =================================================================
import express from 'express';
const router = express.Router();

// =================================================================
//        IMPORT: Admin db services
// =================================================================
import {
  getAllAdmins,
  getAdmin,
  createAdmin,
  updateAdmin,
  deleteAdmin,
} from '../controllers/adminController';

// =================================================================
//        IMPORT: Mddleware validators
// =================================================================
import { signupValidator } from '../validators/authValidators';
import { verifyToken } from '../middlewares/jwt';

// =================================================================
//        GET: All Admins
// =================================================================
router.get('/get-admins', verifyToken, getAllAdmins);

// =================================================================
//        GET: Single Admin
// =================================================================
router.get('/get-admins/:adminID', verifyToken, getAdmin);

// =================================================================
//        POST: New Admin
// =================================================================
router.post('/create-admin', signupValidator, createAdmin);

// =================================================================
//        UPDATE: Existing Admin
// =================================================================
router.patch('/update-admin/:adminID', verifyToken, updateAdmin);

// =================================================================
//        Delete: Existing Admin
// =================================================================
router.delete('/delete-admin/:adminID', verifyToken, deleteAdmin);

module.exports = router;
