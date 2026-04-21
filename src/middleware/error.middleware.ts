import { Request, Response, NextFunction } from 'express';

export const errorConverter = (err: any, req: Request, res: Response, next: NextFunction) => {
  next(err);
};

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

  res.status(500).send('Error');
};
