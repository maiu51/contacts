# Project Context

## Purpose
Build a minimal full-stack **Contacts Manager** web app for a **single user** that demonstrates:
- A working **Frontend UI**
- A **Backend REST API**
- A **real database** with persistence (data survives refresh/restart)
- Full **CRUD** (Create, Read, Update, Delete)
- Basic **search** across contacts

Target: ~100 contacts, quick to implement.

## Tech Stack
- **Frontend:** React + TypeScript, Vite, Tailwind CSS
- **Backend:** Node.js + TypeScript, Express
- **Database:** SQLite + Prisma
- **Validation:** Zod (required fields only)
- **Language:** English (UI)

## Project Structure
```
contacts/
├── web/           # Frontend (React + Vite)
│   └── src/
│       ├── components/
│       ├── services/    # API client (fetch wrappers)
│       └── types/
├── api/           # Backend (Express)
│   └── src/
│       ├── routes/      # Route handlers + Prisma calls
│       └── middleware/  # Error handling, CORS
└── prisma/        # DB schema + migrations
    └── schema.prisma
```

## Domain Context

### Contact Entity
- **Required:** `name` (string), `phone` (string)
- **Optional:** `email` (string, nullable)
- **System:** `id` (uuid), `createdAt`, `updatedAt`

### User Flows
1. View contacts list (all contacts, with optional search)
2. Create a new contact (name + phone required, email optional)
3. Edit an existing contact (via modal or inline)
4. Delete a contact (with confirmation dialog)
5. Search contacts by free-text query

### API Endpoints
Base: `/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/contacts?q=<search>` | List all contacts, optional search |
| POST | `/contacts` | Create contact |
| PUT | `/contacts/:id` | Update contact |
| DELETE | `/contacts/:id` | Delete contact |

**Note:** No separate "get single contact" endpoint — all data shown in list.

### API Response Format
- **Success:** JSON data with appropriate status (200, 201)
- **Error:** `{ "error": "message" }` with status:
  - `400` — Validation error
  - `404` — Contact not found
  - `500` — Server error

### Search Behavior
- Query param: `?q=term`
- Searches across: `name`, `phone`, `email`
- Case-insensitive, partial matching
- Empty query returns all contacts
- Use Prisma `OR` + `contains` (no external library needed)

## Development Setup

### Ports
- **Frontend:** `http://localhost:5173` (Vite default)
- **Backend:** `http://localhost:3000`

### CORS
- Backend must enable CORS for `http://localhost:5173`
- Use `cors` npm package

### Database
- SQLite file: `api/prisma/dev.db`
- Run migrations: `cd api && npx prisma migrate dev`

## Architecture

### Frontend
- Components → Services (fetch) → Backend API
- Local state with `useState`/`useEffect` — no Redux needed
- Modal for create/edit forms

### Backend (Keep Simple!)
- Route handlers call Prisma directly
- No separate controller/service layers for this scale
- Zod validation in route handlers (POST/PUT)
- Centralized error middleware

## Important Constraints
- **Single user only** — no authentication
- **Must have Backend + API** — not client-only
- **Must persist data** — SQLite database
- **~100 contacts** — no pagination needed
- **Out of scope:**
  - No import/export
  - No tags, favorites, photos, notes
  - No sync with external systems

## Success Checklist
- [ ] Create contact → appears in list
- [ ] Edit contact → changes persist
- [ ] Delete contact → removed from list
- [ ] Search → finds by name/phone/email
- [ ] Refresh page → data still there
- [ ] Restart server → data still there
