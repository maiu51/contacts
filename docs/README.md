# Personal Contacts App - Documentation

## Quick Links

- **[Setup Guide](./SETUP.md)** - Installation and initial setup
- **[Command Reference](./COMMANDS.md)** - All available commands
- **[API Reference](./API_REFERENCE.md)** - API endpoints documentation
- **[Development Guide](./DEVELOPMENT.md)** - Development workflows and best practices

## Quick Start

### 1. Install Dependencies

```bash
# Backend
cd api && npm install

# Frontend
cd ../web && npm install
```

### 2. Setup Database

```bash
cd api
npx prisma generate
npx prisma migrate dev
```

### 3. Run Servers

**Terminal 1:**
```bash
cd api
npm run dev
```

**Terminal 2:**
```bash
cd web
npm run dev
```

### 4. Access Application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3000/api/contacts

## Project Overview

A simple personal contacts management application with:

- ✅ CRUD operations for contacts
- ✅ Search functionality
- ✅ SQLite database
- ✅ RESTful API
- ✅ React frontend with TypeScript
- ✅ Responsive design with Tailwind CSS

## Tech Stack

**Backend:**
- Node.js + Express + TypeScript
- Prisma ORM + SQLite
- Zod validation

**Frontend:**
- React + TypeScript + Vite
- Tailwind CSS

## Features

- Create, read, update, delete contacts
- Search contacts by name, phone, or email
- Case-insensitive search
- Responsive UI
- Type-safe API client
- Error handling

## Getting Help

- Check [SETUP.md](./SETUP.md) for installation issues
- Check [COMMANDS.md](./COMMANDS.md) for command usage
- Check [API_REFERENCE.md](./API_REFERENCE.md) for API details
- Check [DEVELOPMENT.md](./DEVELOPMENT.md) for development questions

