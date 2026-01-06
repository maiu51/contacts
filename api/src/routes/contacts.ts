import { Router, Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma';
import { contactSchema } from '../validation/contactSchema';

const router = Router();

// GET /api/contacts - List all contacts or search
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const searchQuery = req.query.q as string | undefined;

    if (searchQuery && searchQuery.trim()) {
      // Search with raw SQL for case-insensitive LIKE
      const term = `%${searchQuery}%`;
      const contacts = await prisma.$queryRawUnsafe<Array<{
        id: string;
        name: string;
        phone: string;
        email: string | null;
        createdAt: Date;
        updatedAt: Date;
      }>>(
        `SELECT * FROM Contact
         WHERE name LIKE ? 
            OR phone LIKE ? 
            OR (email IS NOT NULL AND email LIKE ?)
         ORDER BY createdAt DESC`,
        term, term, term
      );
      return res.json(contacts);
    }

    // Return all contacts ordered by newest first
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

// POST /api/contacts - Create new contact
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate with Zod
    const validated = contactSchema.parse(req.body);

    // Convert empty email string to null
    const email = validated.email && validated.email.trim() !== '' 
      ? validated.email 
      : null;

    // Create contact
    const contact = await prisma.contact.create({
      data: {
        name: validated.name,
        phone: validated.phone,
        email,
      },
    });

    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
});

// PUT /api/contacts/:id - Update contact
router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    // Validate with Zod
    const validated = contactSchema.parse(req.body);

    // Convert empty email string to null
    const email = validated.email && validated.email.trim() !== ''
      ? validated.email
      : null;

    // Check if contact exists
    const existingContact = await prisma.contact.findUnique({
      where: { id },
    });

    if (!existingContact) {
      const error = new Error('Contact not found') as Error & { statusCode?: number };
      error.statusCode = 404;
      throw error;
    }

    // Update contact
    const contact = await prisma.contact.update({
      where: { id },
      data: {
        name: validated.name,
        phone: validated.phone,
        email,
      },
    });

    res.json(contact);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/contacts/:id - Delete contact
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    // Check if contact exists
    const existingContact = await prisma.contact.findUnique({
      where: { id },
    });

    if (!existingContact) {
      const error = new Error('Contact not found') as Error & { statusCode?: number };
      error.statusCode = 404;
      throw error;
    }

    // Delete contact
    await prisma.contact.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;

