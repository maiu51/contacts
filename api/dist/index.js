"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const errorHandler_1 = require("./middleware/errorHandler");
const contacts_1 = __importDefault(require("./routes/contacts"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        // Allow requests from localhost:5173 or 127.0.0.1:5173
        if (!origin || origin === 'http://localhost:5173' || origin === 'http://127.0.0.1:5173') {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
}));
app.use(express_1.default.json());
// Request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    console.log('Headers:', req.headers);
    next();
});
// Routes
app.use('/api/contacts', contacts_1.default);
// Error handling middleware (must be last)
app.use(errorHandler_1.errorHandler);
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Server also accessible on http://127.0.0.1:${PORT}`);
});
