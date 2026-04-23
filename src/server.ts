import app from './app';
import { config } from './config';
import { cleanupService } from './services/cleanup.service';

const PORT = config.port;

// Initialize background tasks
cleanupService.init();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT} in ${config.nodeEnv} mode`);
});
