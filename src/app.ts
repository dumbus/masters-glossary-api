import express from 'express';

import termRoutes from './routes/termRoutes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(express.json());

// Routes
app.use('/api/terms', termRoutes);

// Global error handler
app.use(errorHandler);

export default app;
