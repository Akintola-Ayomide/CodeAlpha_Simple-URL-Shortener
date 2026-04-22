import { Request, Response, NextFunction } from 'express';
import { config } from '../config';

export const errorConverter = (err: any, req: Request, res: Response, next: NextFunction) => {
  next(err);
};

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    error: message,
    ...(config.nodeEnv === 'development' && { stack: err.stack }),
  });
};

