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
//        POST: Forgot Password (Check email & send token)
// =================================================================
router.post('/forgot-password', forgotPassword);

// =================================================================
//        POST: Receive and set new password
// =================================================================
router.post('/reset-password', resetPassword);

module.exports = router;
