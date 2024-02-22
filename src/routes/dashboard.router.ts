// =================================================================
//        Router Config
// =================================================================
import express from 'express';
const router = express.Router();

// =================================================================
//        IMPORT: Support functions
// =================================================================
import { verifyToken } from '../middlewares/jwt';
import { countAllModels } from '../controllers/dashboardController';

// =================================================================
//        GET: Dashboard statistics for Frontend
// =================================================================
router.get('/dashboard-stats', verifyToken, countAllModels);

module.exports = router;
