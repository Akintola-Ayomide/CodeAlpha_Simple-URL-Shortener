import { Router, Request, Response } from 'express';
import urlRoutes from './url.routes';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the URL Shortener API' });
});

router.use('/urls', urlRoutes);

export default router;
