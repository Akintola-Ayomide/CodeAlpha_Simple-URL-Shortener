import { Request, Response, NextFunction } from 'express';
import { urlService } from '../services/url.service';

export const createShortUrl = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { originalUrl } = req.body;
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
    const urlRecord = await urlService.getOriginalUrl(code as string);

    if (!urlRecord) {
      return res.status(404).json({ error: 'URL not found' });
    }

    res.redirect(urlRecord.originalUrl);
  } catch (error) {
    next(error);
  }
};

export const getAllUrls = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const urls = await urlService.getAllUrls();
    const baseUrl = `${req.protocol}://${req.get('host')}`;

    const formattedUrls = urls.map(url => ({
      ...url,
      shortUrl: `${baseUrl}/${url.shortCode}`
    }));

    res.status(200).json(formattedUrls);
  } catch (error) {
    next(error);
  }
};

export const getUrlDetails = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { code } = req.params;
    const urlRecord = await urlService.getOriginalUrl(code as string);

    if (!urlRecord) {
      return res.status(404).json({ error: 'URL not found' });
    }

    const baseUrl = `${req.protocol}://${req.get('host')}`;
    
    res.status(200).json({
      ...urlRecord,
      shortUrl: `${baseUrl}/${urlRecord.shortCode}`
    });
  } catch (error) {
    next(error);
  }
};


