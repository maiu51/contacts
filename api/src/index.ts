import express from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler';
import contactsRouter from './routes/contacts';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
// In development, allow all localhost origins for easier debugging
const isDevelopment = process.env.NODE_ENV !== 'production';
app.use(cors({
  origin: (origin, callback) => {
    // In development, be more permissive - allow any localhost port
    if (isDevelopment) {
      // Allow requests from any localhost port (5173, 5174, etc.) or no origin (direct/proxy requests)
      if (!origin || 
          origin.includes('localhost:') || 
          origin.includes('127.0.0.1:') ||
          origin.startsWith('http://localhost') ||
          origin.startsWith('http://127.0.0.1')) {
        callback(null, true);
      } else {
        console.warn('CORS blocked origin:', origin);
        callback(new Error('Not allowed by CORS'));
      }
    } else {
      // Production: strict origin checking
      if (origin === 'http://localhost:5173' || origin === 'http://127.0.0.1:5173') {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
}));
app.use(express.json());

// Request logging middleware (only log non-304 requests to reduce noise)
app.use((req, res, next) => {
  // Only log if it's not a conditional request (304 checks)
  if (!req.headers['if-none-match'] && !req.headers['if-modified-since']) {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  }
  next();
});

// Routes
app.use('/api/contacts', contactsRouter);

// Error handling middleware (must be last)
app.use(errorHandler);

app.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Server also accessible on http://127.0.0.1:${PORT}`);
});

