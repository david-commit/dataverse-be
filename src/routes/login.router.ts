// =================================================================
//        Router Config
// =================================================================
import express from 'express';
const router = express.Router();

// =================================================================
//        IMPORT: Admin Login Controller
// =================================================================
import { loginController } from '../controllers/loginController';

// =================================================================
//        POST: Login
// =================================================================
router.post('/admin-login', loginController);

module.exports = router;
