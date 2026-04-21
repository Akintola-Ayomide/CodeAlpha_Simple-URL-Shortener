import { Request, Response, NextFunction } from 'express';

export const createShortUrl = async (req: Request, res: Response, next: NextFunction) => {

  res.send('Create short URL endpoint');
};

export const redirectToUrl = async (req: Request, res: Response, next: NextFunction) => {

  res.send('Redirect endpoint');
};
