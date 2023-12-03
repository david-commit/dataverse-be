// =================================================================
//        Router Config
// =================================================================
import express from 'express';
const router = express.Router();

// =================================================================
//        IMPORT: Admin Login Controller
// =================================================================
import { verifyToken } from '../middlewares/jwt';

// =================================================================
//        GET: Dashboard statistics for Frontend
// =================================================================
router.get('/dashboard-stats', verifyToken);

module.exports = router;
