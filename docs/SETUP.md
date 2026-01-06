# Personal Contacts App - Setup Guide

## Prerequisites

- Node.js v20+ 
- npm v10+

## Initial Setup

### 1. Clone and Install Dependencies

```bash
# Install Backend dependencies
cd api
npm install

# Install Frontend dependencies
cd ../web
npm install
```

### 2. Database Setup

```bash
cd api

# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# (Optional) View database with Prisma Studio
npx prisma studio
```

## Running the Application

### Option 1: Run Both Servers Separately (Recommended for Development)

**Terminal 1 - Backend API:**
```bash
cd api
npm run dev
```
Server will start on: `http://localhost:3000`

**Terminal 2 - Frontend UI:**
```bash
cd web
npm run dev
```
Frontend will start on: `http://localhost:5173`

### Option 2: Quick Start Script

```bash
# From project root
./scripts/start.sh
```

## Stopping the Application

Press `Ctrl+C` in each terminal to stop the servers.

## Port Configuration

- **Backend API:** `http://localhost:3000`
- **Frontend UI:** `http://localhost:5173`
- **Database:** SQLite file at `api/prisma/dev.db`

## Troubleshooting

### Port Already in Use

If you get an error that port 3000 or 5173 is already in use:

```bash
# Find process using port 3000
lsof -i :3000

# Kill the process (replace PID with actual process ID)
kill -9 <PID>
```

### Prisma Client Not Found

```bash
cd api
npx prisma generate
```

### Database Reset

```bash
cd api
rm prisma/dev.db
npx prisma migrate dev
```

## Next Steps

- Read [API_REFERENCE.md](./API_REFERENCE.md) for API documentation
- Read [DEVELOPMENT.md](./DEVELOPMENT.md) for development workflows

