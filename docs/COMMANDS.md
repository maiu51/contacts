# Command Reference

## Backend (API)

### Development

```bash
cd api

# Start development server with auto-reload
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Database Commands

```bash
cd api

# Generate Prisma Client (after schema changes)
npx prisma generate

# Create and apply migration
npx prisma migrate dev --name <migration-name>

# Apply existing migrations
npx prisma migrate deploy

# Open Prisma Studio (database GUI)
npx prisma studio

# Reset database (WARNING: deletes all data)
npx prisma migrate reset
```

### TypeScript

```bash
cd api

# Type check without building
npx tsc --noEmit

# Build
npm run build
```

## Frontend (Web)

### Development

```bash
cd web

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### TypeScript & Linting

```bash
cd web

# Type check
npx tsc --noEmit

# Lint code
npm run lint
```

## Testing API Endpoints

### Using curl

```bash
# Get all contacts
curl http://localhost:3000/api/contacts

# Search contacts
curl "http://localhost:3000/api/contacts?q=john"

# Create contact
curl -X POST http://localhost:3000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","phone":"052-1234567","email":"john@example.com"}'

# Update contact
curl -X PUT http://localhost:3000/api/contacts/<id> \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe","phone":"053-7654321","email":"jane@example.com"}'

# Delete contact
curl -X DELETE http://localhost:3000/api/contacts/<id>
```

## Quick Commands

### Start Everything

```bash
# Terminal 1
cd api && npm run dev

# Terminal 2 (in new terminal)
cd web && npm run dev
```

### Stop Everything

Press `Ctrl+C` in each terminal.

### Clean Install

```bash
# Remove node_modules and reinstall
cd api
rm -rf node_modules package-lock.json
npm install

cd ../web
rm -rf node_modules package-lock.json
npm install
```

### View Logs

```bash
# Backend logs are in the terminal where you ran `npm run dev`
# Frontend logs are in the browser console and terminal
```

