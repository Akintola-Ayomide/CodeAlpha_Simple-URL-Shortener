import { body, param } from 'express-validator';

export const urlValidationRules = [
  body('originalUrl')
    .trim()
    .notEmpty().withMessage('Original URL is required')
    .isURL().withMessage('Invalid URL format')
];

export const codeValidationRules = [
  param('code')
    .trim()
    .notEmpty().withMessage('Short code is required')
    .matches(/^[A-Za-z0-9_-]+$/).withMessage('Invalid short code format')
    .isLength({ min: 1, max: 20 }).withMessage('Invalid short code length')
];
