# Development Guide

## Project Structure

```
contacts/
├── api/                    # Backend (Node.js + Express + Prisma)
│   ├── prisma/
│   │   ├── schema.prisma  # Database schema
│   │   ├── migrations/    # Database migrations
│   │   └── dev.db        # SQLite database file
│   ├── src/
│   │   ├── index.ts      # Express app entry point
│   │   ├── routes/       # API route handlers
│   │   ├── middleware/   # Express middleware
│   │   ├── validation/   # Zod schemas
│   │   └── lib/          # Utilities (Prisma client)
│   └── package.json
│
├── web/                   # Frontend (React + TypeScript + Vite)
│   ├── src/
│   │   ├── main.tsx      # React entry point
│   │   ├── App.tsx       # Root component
│   │   ├── components/   # React components
│   │   ├── services/     # API client
│   │   └── types/        # TypeScript types
│   └── package.json
│
└── docs/                 # Documentation
    ├── SETUP.md
    ├── COMMANDS.md
    ├── API_REFERENCE.md
    └── DEVELOPMENT.md
```

## Tech Stack

### Backend
- **Runtime:** Node.js 20+
- **Framework:** Express.js
- **Database:** SQLite
- **ORM:** Prisma v7 with Better SQLite3 adapter
- **Validation:** Zod
- **Language:** TypeScript

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **HTTP Client:** Native Fetch API

## Development Workflow

### 1. Backend Development

```bash
cd api
npm run dev  # Starts ts-node-dev with auto-reload
```

**Making Changes:**
1. Edit files in `src/`
2. Server auto-reloads on save
3. Check terminal for TypeScript errors

**Database Changes:**
```bash
# 1. Edit prisma/schema.prisma
# 2. Create migration
npx prisma migrate dev --name <description>
# 3. Prisma Client auto-regenerates
```

### 2. Frontend Development

```bash
cd web
npm run dev  # Starts Vite dev server
```

**Making Changes:**
1. Edit files in `src/`
2. Browser auto-reloads via HMR
3. Check browser console and terminal

### 3. Testing Changes

**Backend:**
```bash
# Use curl or any HTTP client
curl http://localhost:3000/api/contacts
```

**Frontend:**
- Open `http://localhost:5173` in browser
- Use React DevTools for debugging
- Check Network tab for API calls

## Code Standards

### TypeScript

- Use strict type checking
- Avoid `any` type
- Use `type` imports for type-only imports
- Define interfaces for data structures

### Backend

- Use async/await (no callbacks)
- Validate all inputs with Zod
- Use centralized error handling
- Return consistent JSON responses

### Frontend

- Use functional components with hooks
- Avoid prop drilling (use Context if needed)
- Handle loading and error states
- Use TypeScript types from backend

## Git Workflow

```bash
# 1. Create feature branch
git checkout -b feature/your-feature

# 2. Make changes and commit
git add .
git commit -m "Description of changes"

# 3. Push to remote
git push origin feature/your-feature

# 4. Create pull request (if using GitHub)
```

## Common Tasks

### Add New API Endpoint

1. Add route handler in `api/src/routes/contacts.ts`
2. Add validation schema if needed
3. Test with curl
4. Update `docs/API_REFERENCE.md`

### Add Frontend Component

1. Create component in `web/src/components/`
2. Define props interface
3. Use Tailwind for styling
4. Import and use in parent component

### Add Database Field

1. Update `api/prisma/schema.prisma`
2. Run `npx prisma migrate dev --name add_field_name`
3. Update TypeScript types
4. Update API handlers
5. Update frontend types

## Debugging

### Backend

- Add `console.log()` statements
- Check terminal output
- Use Node.js debugger
- Check database with `npx prisma studio`

### Frontend

- Use browser DevTools Console
- Use React DevTools extension
- Check Network tab for API calls
- Add `console.log()` in components

## Performance Tips

- Use React.memo() for expensive components
- Debounce search inputs (300ms)
- Lazy load images if added
- Use proper database indexes

## Security Notes

- Never commit `.env` files
- Validate all user inputs
- Use parameterized queries (Prisma does this)
- Keep dependencies updated

## Resources

- [Express.js Docs](https://expressjs.com/)
- [Prisma Docs](https://www.prisma.io/docs)
- [React Docs](https://react.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

