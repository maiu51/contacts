# Change: Add Contacts Manager

## Why
Build a minimal full-stack contacts management application to demonstrate Frontend + Backend + Database + CRUD + Search capabilities for a single user managing ~100 contacts.

## What Changes
- Create Express backend with SQLite database (Prisma ORM)
- Create React frontend with Vite and Tailwind CSS
- Implement 4 REST API endpoints for contacts CRUD
- Implement contacts list UI with search, create, edit, delete
- Enable data persistence across page refresh and server restart

## Impact
- Affected specs: `api`, `ui` (new capabilities)
- New project structure: `web/` (frontend), `api/` (backend), `prisma/` (database)

