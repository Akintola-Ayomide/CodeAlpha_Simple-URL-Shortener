import { Request, Response, NextFunction } from 'express';
import { urlService } from '../services/url.service';

export const createShortUrl = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: 'Request body is missing or invalid' });
    }
    const { originalUrl } = req.body;

    if (!originalUrl) {
      return res.status(400).json({ error: 'Original URL is required' });
    }

    // Basic URL validation
    try {
      new URL(originalUrl);
    } catch (err) {
      return res.status(400).json({ error: 'Invalid URL format' });
    }

    const urlRecord = await urlService.shortenUrl(originalUrl);
    
    // Construct short URL
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const shortUrl = `${baseUrl}/${urlRecord.shortCode}`;

    res.status(201).json({
      originalUrl: urlRecord.originalUrl,
      shortCode: urlRecord.shortCode,
      shortUrl: shortUrl,
      createdAt: urlRecord.createdAt
    });
  } catch (error) {
    next(error);
  }
};

export const redirectToUrl = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { code } = req.params;
    const urlRecord = await urlService.getOriginalUrl(code);

    if (!urlRecord) {
      return res.status(404).json({ error: 'URL not found' });
    }

    res.redirect(urlRecord.originalUrl);
  } catch (error) {
    next(error);
  }
};

