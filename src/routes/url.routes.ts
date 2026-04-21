import { Router } from 'express';
import { createShortUrl, redirectToUrl } from '../controllers/url.controller';

const router = Router();

router.post('/shorten', createShortUrl);
router.get('/:code', redirectToUrl);

export default router;
