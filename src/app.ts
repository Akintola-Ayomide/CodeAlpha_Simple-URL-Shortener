import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './config';
import routes from './routes';

import { errorConverter, errorHandler } from './middleware/error.middleware';
import { redirectToUrl } from './controllers/url.controller';
import { codeValidationRules, validate } from './middleware/validate.middleware';


const app: Application = express();


// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (config.nodeEnv === 'development') {
  app.use(morgan('dev'));
}

// Routes
app.use('/api', routes);

// Redirect route
app.get('/:code', codeValidationRules, validate, redirectToUrl);



// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
