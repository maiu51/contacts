# Implementation Tasks

## 1. Project Setup
- [ ] 1.1 Initialize `api/` with Node.js + TypeScript + Express
- [ ] 1.2 Initialize `web/` with Vite + React + TypeScript + Tailwind CSS
- [ ] 1.3 Setup Prisma with SQLite in `prisma/`
- [ ] 1.4 Create Contact model in Prisma schema
- [ ] 1.5 Run initial migration

## 2. Backend API
- [ ] 2.1 Setup Express server with CORS middleware
- [ ] 2.2 Create Zod validation schema for Contact
- [ ] 2.3 Implement GET /api/contacts (with search query)
- [ ] 2.4 Implement POST /api/contacts
- [ ] 2.5 Implement PUT /api/contacts/:id
- [ ] 2.6 Implement DELETE /api/contacts/:id
- [ ] 2.7 Add centralized error handling middleware

## 3. Frontend Services
- [ ] 3.1 Create API client service (fetch wrapper)
- [ ] 3.2 Create TypeScript types for Contact

## 4. Frontend UI
- [ ] 4.1 Create ContactList component (displays all contacts)
- [ ] 4.2 Create ContactItem component (single row with edit/delete buttons)
- [ ] 4.3 Create ContactModal component (form for create/edit)
- [ ] 4.4 Create SearchBar component (with debounced input)
- [ ] 4.5 Wire up App component with state management
- [ ] 4.6 Add confirmation dialog for delete

## 5. Integration & Testing
- [ ] 5.1 Verify CRUD operations work end-to-end
- [ ] 5.2 Verify search functionality
- [ ] 5.3 Verify data persists after page refresh
- [ ] 5.4 Verify data persists after server restart

