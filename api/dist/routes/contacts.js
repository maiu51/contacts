"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../lib/prisma"));
const contactSchema_1 = require("../validation/contactSchema");
const router = (0, express_1.Router)();
// GET /api/contacts - List all contacts or search
router.get('/', async (req, res, next) => {
    try {
        const searchQuery = req.query.q;
        if (searchQuery && searchQuery.trim()) {
            // Search with raw SQL for case-insensitive LIKE
            const term = `%${searchQuery}%`;
            const contacts = await prisma_1.default.$queryRawUnsafe(`SELECT * FROM Contact
         WHERE name LIKE ? 
            OR phone LIKE ? 
            OR (email IS NOT NULL AND email LIKE ?)
         ORDER BY createdAt DESC`, term, term, term);
            return res.json(contacts);
        }
        // Return all contacts ordered by newest first
        const contacts = await prisma_1.default.contact.findMany({
            orderBy: { createdAt: 'desc' },
        });
        res.json(contacts);
    }
    catch (error) {
        next(error);
    }
});
// POST /api/contacts - Create new contact
router.post('/', async (req, res, next) => {
    try {
        // Validate with Zod
        const validated = contactSchema_1.contactSchema.parse(req.body);
        // Convert empty email string to null
        const email = validated.email && validated.email.trim() !== ''
            ? validated.email
            : null;
        // Create contact
        const contact = await prisma_1.default.contact.create({
            data: {
                name: validated.name,
                phone: validated.phone,
                email,
            },
        });
        res.status(201).json(contact);
    }
    catch (error) {
        next(error);
    }
});
// PUT /api/contacts/:id - Update contact
router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        // Validate with Zod
        const validated = contactSchema_1.contactSchema.parse(req.body);
        // Convert empty email string to null
        const email = validated.email && validated.email.trim() !== ''
            ? validated.email
            : null;
        // Check if contact exists
        const existingContact = await prisma_1.default.contact.findUnique({
            where: { id },
        });
        if (!existingContact) {
            const error = new Error('Contact not found');
            error.statusCode = 404;
            throw error;
        }
        // Update contact
        const contact = await prisma_1.default.contact.update({
            where: { id },
            data: {
                name: validated.name,
                phone: validated.phone,
                email,
            },
        });
        res.json(contact);
    }
    catch (error) {
        next(error);
    }
});
// DELETE /api/contacts/:id - Delete contact
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        // Check if contact exists
        const existingContact = await prisma_1.default.contact.findUnique({
            where: { id },
        });
        if (!existingContact) {
            const error = new Error('Contact not found');
            error.statusCode = 404;
            throw error;
        }
        // Delete contact
        await prisma_1.default.contact.delete({
            where: { id },
        });
        res.status(200).send();
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
