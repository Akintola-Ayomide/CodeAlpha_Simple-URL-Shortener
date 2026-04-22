import { Router } from 'express';
import { createShortUrl, getAllUrls, getUrlDetails } from '../controllers/url.controller';

const router = Router();

router.post('/shorten', createShortUrl);
router.get('/', getAllUrls);
router.get('/:code', getUrlDetails);

export default router;


