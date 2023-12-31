import { body } from 'express-validator';

// =================================================================
//        Signup validation checks
// =================================================================
export const signupValidator = [
  body('name').notEmpty().withMessage('Full name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').notEmpty().withMessage('Phone is reqired'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
];
