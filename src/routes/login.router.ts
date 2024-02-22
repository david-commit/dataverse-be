// =================================================================
//        Router Config
// =================================================================
import express from 'express';
const router = express.Router();

// =================================================================
//        IMPORT: Admin Login Controller
// =================================================================
import { loginController, logoutController } from '../controllers/loginController';
import { confirmAuthentication } from '../middlewares/jwt';

// =================================================================
//        POST: Login
// =================================================================
router.post('/admin-login', loginController);

// =================================================================
//        POST: Verify user token
// =================================================================
router.post('/auth/me', confirmAuthentication);

// =================================================================
//        POST: Logout
// =================================================================
router.post('/admin-logout', logoutController);

module.exports = router;
