// =================================================================
//        Router Config
// =================================================================
import express from 'express';
const router = express.Router();

// =================================================================
//        IMPORT: Admin Login Controller
// =================================================================
import { loginController } from '../controllers/loginController';
import { verifyToken } from '../middlewares/jwt';

// =================================================================
//        POST: Login
// =================================================================
router.post('/admin-login', loginController);
// router.post('/admin-login', verifyToken, loginController);

module.exports = router;
