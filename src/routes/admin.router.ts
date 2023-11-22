// =================================================================
//        Router Config
// =================================================================
import express from 'express';
const router = express.Router();

// =================================================================
//        IMPORT: admin db services
// =================================================================
import {
  getAllAdminsService,
  getAdminService,
  createAdminService,
  updateAdminService,
} from '../services/admin.services';

// =================================================================
//        GET: All Admins
// =================================================================
router.get('/get-admins', getAllAdminsService);

// =================================================================
//        GET: Single Admin
// =================================================================
router.get('/get-admin', getAdminService);

// =================================================================
//        POST: New Admin
// =================================================================
router.post('/create-admin', createAdminService);

// =================================================================
//        UPDATE: Existing Admin
// =================================================================
router.put('/create-admin', updateAdminService);

module.exports = router;
