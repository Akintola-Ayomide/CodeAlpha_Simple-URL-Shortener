import cron from 'node-cron';
import { prisma } from '../lib/prisma';

export const cleanupService = {
  async deleteExpiredUrls() {
    console.log('Running cleanup job: Deleting URLs older than 10 days...');
    
    try {
      const tenDaysAgo = new Date();
      tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);

      const result = await prisma.url.deleteMany({
        where: {
          createdAt: {
            lt: tenDaysAgo,
          },
        },
      });

      console.log(`Cleanup completed. Deleted ${result.count} expired URLs.`);
    } catch (error) {
      console.error('Error during cleanup job:', error);
    }
  },

  init() {
    // Run every day at midnight
    cron.schedule('0 0 * * *', () => {
      this.deleteExpiredUrls();
    });

    // Also run once on startup to clean up any missed ones
    this.deleteExpiredUrls();
  }
};
