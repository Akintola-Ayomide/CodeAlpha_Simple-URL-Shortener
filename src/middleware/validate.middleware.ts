import { Request, Response, NextFunction } from 'express';
import { validationResult, body, param } from 'express-validator';

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  return res.status(400).json({
    errors: errors.array().map(err => ({
      message: err.msg,
      field: (err as any).path || (err as any).param
    }))
  });
};

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
    .isAlphanumeric().withMessage('Short code must be alphanumeric')
    .isLength({ min: 1, max: 20 }).withMessage('Invalid short code length')
];
