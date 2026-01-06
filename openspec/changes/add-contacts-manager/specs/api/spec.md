# API Specification

## ADDED Requirements

### Requirement: Contact Data Model
The system SHALL store contacts with fields: id (UUID), name (required string), phone (required string), email (optional string), createdAt, updatedAt.

#### Scenario: Contact creation with required fields
- **WHEN** a contact is created with name and phone
- **THEN** the contact SHALL be stored with auto-generated id, createdAt, and updatedAt

#### Scenario: Contact creation with all fields
- **WHEN** a contact is created with name, phone, and email
- **THEN** all fields SHALL be stored correctly

#### Scenario: Empty email handling
- **WHEN** contact created with email as empty string or not provided
- **THEN** email SHALL be stored as null (not empty string)

#### Scenario: Email format validation
- **WHEN** POST/PUT with email field
- **THEN** email SHALL be accepted as-is without format validation (email is optional free-text)

### Requirement: List Contacts Endpoint
The system SHALL provide GET /api/contacts to retrieve all contacts, ordered by createdAt descending (newest first).

#### Scenario: List all contacts
- **WHEN** GET /api/contacts is called without query
- **THEN** all contacts SHALL be returned as JSON array
- **AND** each contact SHALL include all fields: id, name, phone, email, createdAt, updatedAt

#### Scenario: List response format
- **WHEN** GET /api/contacts returns successfully
- **THEN** response body SHALL be a JSON array directly: [{...}, {...}]

#### Scenario: Search contacts
- **WHEN** GET /api/contacts?q=term is called
- **THEN** contacts matching term in name, phone, or email SHALL be returned
- **AND** search SHALL be case-insensitive and partial matching
- **AND** contacts with null email SHALL be searched only on name and phone fields

#### Scenario: Empty search
- **WHEN** GET /api/contacts?q= is called with empty query
- **THEN** all contacts SHALL be returned

### Requirement: Create Contact Endpoint
The system SHALL provide POST /api/contacts to create a new contact.

#### Scenario: Successful creation
- **WHEN** POST /api/contacts with valid name and phone
- **THEN** contact SHALL be created and returned with status 201
- **AND** response body SHALL contain the created contact with all fields including id, createdAt, updatedAt

#### Scenario: Validation error
- **WHEN** POST /api/contacts with missing name or phone
- **THEN** error response SHALL be returned with status 400

### Requirement: Update Contact Endpoint
The system SHALL provide PUT /api/contacts/:id to update an existing contact.

#### Scenario: Successful update
- **WHEN** PUT /api/contacts/:id with valid data
- **THEN** contact SHALL be updated and returned with status 200
- **AND** response body SHALL contain the updated contact with all fields including updatedAt timestamp

#### Scenario: Contact not found
- **WHEN** PUT /api/contacts/:id with non-existent id
- **THEN** error response SHALL be returned with status 404

### Requirement: Delete Contact Endpoint
The system SHALL provide DELETE /api/contacts/:id to remove a contact.

#### Scenario: Successful deletion
- **WHEN** DELETE /api/contacts/:id with valid id
- **THEN** contact SHALL be removed and status 200 returned
- **AND** response body SHALL be empty (no JSON body)

#### Scenario: Contact not found
- **WHEN** DELETE /api/contacts/:id with non-existent id
- **THEN** error response SHALL be returned with status 404

### Requirement: Error Response Format
The system SHALL return errors as JSON with format: { "error": "message" }.

#### Scenario: Validation error format
- **WHEN** a validation error occurs
- **THEN** response SHALL be { "error": "description" } with status 400

#### Scenario: Server error format
- **WHEN** an unexpected error occurs
- **THEN** response SHALL be { "error": "Internal server error" } with status 500

### Requirement: CORS Support
The system SHALL enable CORS for frontend origin http://localhost:5173.

#### Scenario: Cross-origin request
- **WHEN** frontend makes API request
- **THEN** CORS headers SHALL allow the request

