import express from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler';
import contactsRouter from './routes/contacts';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
}));
app.use(express.json());

// Routes
app.use('/api/contacts', contactsRouter);

// Error handling middleware (must be last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

