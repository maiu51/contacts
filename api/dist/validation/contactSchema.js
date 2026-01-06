"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactSchema = void 0;
const zod_1 = require("zod");
exports.contactSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required'),
    phone: zod_1.z.string().min(1, 'Phone is required'),
    email: zod_1.z.string().optional().nullable(),
});
