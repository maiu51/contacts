"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const zod_1 = require("zod");
const errorHandler = (err, req, res, next) => {
    // Handle Zod validation errors
    if (err instanceof zod_1.ZodError) {
        const firstError = err.issues[0];
        return res.status(400).json({
            error: firstError?.message || 'Validation error',
        });
    }
    // Handle custom AppErrors
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    res.status(statusCode).json({
        error: message,
    });
};
exports.errorHandler = errorHandler;
