import { Router } from 'express';
import { createShortUrl, getAllUrls, getUrlDetails } from '../controllers/url.controller';
import { urlValidationRules, codeValidationRules, validate } from '../middleware/validate.middleware';
import { createUrlLimiter } from '../middleware/rate-limit.middleware';

const router = Router();

router.post('/shorten', createUrlLimiter, urlValidationRules, validate, createShortUrl);
router.get('/', getAllUrls);
router.get('/:code', codeValidationRules, validate, getUrlDetails);

export default router;



