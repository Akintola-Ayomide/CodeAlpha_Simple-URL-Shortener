import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './config';
import routes from './routes';

import { errorConverter, errorHandler } from './middleware/error.middleware';
import { redirectToUrl } from './controllers/url.controller';
import { validate } from './middleware/validate.middleware';
import { codeValidationRules } from './validations/url.validation';
import { apiLimiter } from './middleware/rate-limit.middleware';


const app: Application = express();


// Middleware
app.use(helmet());
app.use(cors({
  origin: [
    'http://localhost:5173',  // Vite dev server
    'http://localhost:4173',  // Vite preview
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (config.nodeEnv === 'development') {
  app.use(morgan('dev'));
}

// Routes
app.use('/api', apiLimiter, routes);

// Redirect route
app.get('/:code', apiLimiter, codeValidationRules, validate, redirectToUrl);



// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
