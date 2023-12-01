// =================================================================
//        Router Config
// =================================================================
import express from 'express';
const router = express.Router();

// =================================================================
//        IMPORT: Admin Login Controller
// =================================================================
import {
  resetPassword,
  forgotPassword,
} from '../controllers/passwordResetController';

// =================================================================
//        POST: Login
// =================================================================
router.post('/forgot-password', forgotPassword);

// =================================================================
//        POST: Verify user token
// =================================================================
router.post('/reset-password', resetPassword);

module.exports = router;
