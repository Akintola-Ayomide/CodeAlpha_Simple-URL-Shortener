import { nanoid } from 'nanoid';
import { prisma } from '../lib/prisma';

export const urlService = {
  async shortenUrl(originalUrl: string) {
    // Check if the URL already exists
    let urlRecord = await prisma.url.findFirst({
      where: { originalUrl }
    });

    if (urlRecord) {
      return urlRecord;
    }

    // Generate unique short code
    const shortCode = nanoid(8);

    // Save to database
    urlRecord = await prisma.url.create({
      data: {
        originalUrl,
        shortCode
      }
    });

    return urlRecord;
  },

  async getOriginalUrl(shortCode: string) {
    return await prisma.url.findUnique({
      where: { shortCode }
    });
  }
};

