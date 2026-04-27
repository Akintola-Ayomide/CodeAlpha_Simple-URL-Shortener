import app from './app';
import { config } from './config';
import { cleanupService } from './services/cleanup.service';
import { logger } from './lib/logger';
import { prisma } from './lib/prisma';

const PORT = config.port;

// Initialize background tasks
cleanupService.init();

const server = app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT} in ${config.nodeEnv} mode`);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: Error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
