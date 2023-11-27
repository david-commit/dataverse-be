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
//        GET: All Admins
// =================================================================
router.get('/get-admins', getAllAdmins);

// =================================================================
//        GET: Single Admin
// =================================================================
router.get('/get-admins/:adminID', getAdmin);

// =================================================================
//        POST: New Admin
// =================================================================
router.post('/create-admin', createAdmin);

// =================================================================
//        UPDATE: Existing Admin
// =================================================================
router.put('/create-admin', updateAdmin);

// =================================================================
//        Delete: Existing Admin
// =================================================================
router.delete('/delete-admin', deleteAdmin);

module.exports = router;
