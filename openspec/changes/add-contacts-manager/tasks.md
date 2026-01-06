# Implementation Tasks

## 1. Project Setup
- [x] 1.1 Initialize `api/` directory with Node.js + TypeScript + Express
- [x] 1.2 Initialize `web/` directory with Vite + React + TypeScript
- [x] 1.3 Install and configure Tailwind CSS in `web/`
- [x] 1.4 Setup Prisma with SQLite in `api/prisma/`
- [x] 1.5 Create Contact model in Prisma schema (id UUID, name, phone, email nullable, timestamps)
- [x] 1.6 Run initial migration to create database

## 2. Backend API Setup
- [x] 2.1 Create Express server in `api/src/index.ts`
- [x] 2.2 Install and configure CORS middleware for `http://localhost:5173`
- [x] 2.3 Create Zod validation schema for Contact (name, phone required; email optional)
- [x] 2.4 Create centralized error handling middleware returning `{ error: string }` format
- [x] 2.5 Configure error middleware to handle 400, 404, 500 status codes

## 3. Backend API Endpoints
- [x] 3.1 Implement GET /api/contacts route handler
- [x] 3.2 Add ordering by createdAt DESC (newest first) to GET /api/contacts
- [x] 3.3 Add search query parameter handling (?q=term) to GET /api/contacts
- [x] 3.4 Implement search logic: case-insensitive, partial match on name/phone/email (handle null email) using Prisma `$queryRaw` with SQLite `LIKE` operator (Prisma `contains` is case-sensitive on SQLite)
- [x] 3.5 Implement empty query handling (return all contacts when q is empty)
- [x] 3.6 Ensure GET /api/contacts returns JSON array directly (not wrapped in object)
- [x] 3.7 Implement POST /api/contacts route handler with Zod validation
- [x] 3.8 Handle empty email string (convert to null) in POST /api/contacts
- [x] 3.9 Return created contact with all fields (id, timestamps) in POST response (status 201)
- [x] 3.10 Implement PUT /api/contacts/:id route handler with Zod validation
- [x] 3.11 Handle empty email string (convert to null) in PUT /api/contacts/:id
- [x] 3.12 Add 404 error handling when contact not found in PUT
- [x] 3.13 Return updated contact with all fields in PUT response (status 200)
- [x] 3.14 Implement DELETE /api/contacts/:id route handler
- [x] 3.15 Add 404 error handling when contact not found in DELETE
- [x] 3.16 Return empty body (status 200) on successful DELETE

## 4. Frontend Services Layer
- [x] 4.1 Create TypeScript Contact type/interfaces (matching API response)
- [x] 4.2 Create API client service with base URL configuration
- [x] 4.3 Implement getAllContacts function (GET /api/contacts)
- [x] 4.4 Implement searchContacts function (GET /api/contacts?q=term)
- [x] 4.5 Implement createContact function (POST /api/contacts)
- [x] 4.6 Implement updateContact function (PUT /api/contacts/:id)
- [x] 4.7 Implement deleteContact function (DELETE /api/contacts/:id)
- [x] 4.8 Add error handling in API client (catch network errors, parse error responses)

## 5. Frontend UI Components
- [x] 5.1 Create ContactList component structure
- [x] 5.2 Display contacts in list format (name, phone, email, buttons)
- [x] 5.3 Implement empty state display ("No contacts yet")
- [x] 5.4 Create ContactItem component (single row with Edit/Delete buttons)
- [x] 5.5 Create SearchBar component with input field
- [x] 5.6 Implement 300ms debounce for search input
- [x] 5.7 Add "No contacts found" message when search returns empty
- [x] 5.8 Create ContactModal component structure
- [x] 5.9 Add form fields: name (required), phone (required), email (optional)
- [x] 5.10 Implement modal open/close state management
- [x] 5.11 Implement modal mode state (create vs edit)
- [x] 5.12 Add "Add Contact" button that opens modal in create mode
- [x] 5.13 Add Edit button on ContactItem that opens modal in edit mode
- [x] 5.14 Implement form pre-filling when opening edit modal
- [x] 5.15 Create confirmation dialog for delete action (native confirm or custom)
- [x] 5.16 Handle cancel action in delete confirmation (keep contact in list)

## 6. Frontend State & Integration
- [x] 6.1 Setup App component with contacts state (useState)
- [x] 6.2 Implement loading state for contacts fetch
- [x] 6.3 Implement useEffect to fetch contacts on mount
- [x] 6.4 Wire up SearchBar to call API and update contacts state
- [x] 6.5 Wire up CreateContact to call API and refresh list on success
- [x] 6.6 Wire up UpdateContact to call API and refresh list on success
- [x] 6.7 Wire up DeleteContact to call API and remove from list on success
- [x] 6.8 Implement list refresh after create/edit operations

## 7. Frontend Validation & Error Handling
- [ ] 7.1 Implement client-side validation (name and phone required) before form submit
- [ ] 7.2 Display inline error messages for validation failures
- [ ] 7.3 Prevent form submission when validation fails
- [ ] 7.4 Display server validation errors (400) in modal
- [ ] 7.5 Keep modal open when validation errors occur
- [ ] 7.6 Handle network errors (catch and identify network failures)
- [ ] 7.7 Display network error message in UI (toast/alert/banner)
- [ ] 7.8 Handle 500 server errors (catch 500 status responses)
- [ ] 7.9 Display 500 error message in UI (generic error message)
- [ ] 7.10 Handle 404 on edit (display error, close modal)

## 8. Frontend Loading States
- [ ] 8.1 Show loading indicator when fetching contacts list
- [ ] 8.2 Disable submit button when saving (create/edit)
- [ ] 8.3 Show loading state in submit button during save operation

## 9. Integration & Testing
- [ ] 9.1 Verify create contact → appears in list (newest first)
- [ ] 9.2 Verify edit contact → changes persist and reflect in list
- [ ] 9.3 Verify delete contact → removed from list
- [ ] 9.4 Verify search finds contacts by name/phone/email
- [ ] 9.5 Verify search with no results shows "No contacts found"
- [ ] 9.6 Verify data persists after page refresh
- [ ] 9.7 Verify data persists after server restart

## 10. Frontend Design & Styling
- [x] 10.1 Implement modern color scheme (primary blue, neutral grays, success/error colors)
- [x] 10.2 Add smooth transitions and hover effects on interactive elements
- [x] 10.3 Implement card-based design for contact list items with subtle shadows
- [x] 10.4 Add proper spacing and typography hierarchy (headings, body text)
- [x] 10.5 Style modal with backdrop blur and smooth animations
- [x] 10.6 Implement responsive design for mobile and tablet views
- [x] 10.7 Add focus states and accessibility improvements (keyboard navigation)
- [x] 10.8 Style loading spinner with modern animation
- [x] 10.9 Implement consistent button styles (primary, secondary, danger)
- [x] 10.10 Add icon support for actions (edit, delete, search, add)
- [x] 10.11 Style form inputs with focus states and validation styling
- [x] 10.12 Implement empty states with illustrations or icons
