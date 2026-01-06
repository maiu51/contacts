# API Reference

Base URL: `http://localhost:3000/api`

## Endpoints

### List Contacts

**GET** `/contacts`

Returns all contacts ordered by newest first.

**Query Parameters:**
- `q` (optional) - Search term for filtering contacts by name, phone, or email

**Response:** `200 OK`
```json
[
  {
    "id": "uuid",
    "name": "John Doe",
    "phone": "052-1234567",
    "email": "john@example.com",
    "createdAt": "2026-01-06T12:00:00.000Z",
    "updatedAt": "2026-01-06T12:00:00.000Z"
  }
]
```

### Search Contacts

**GET** `/contacts?q=<search-term>`

Search contacts by name, phone, or email (case-insensitive).

**Example:**
```bash
GET /contacts?q=john
```

**Response:** `200 OK`
```json
[
  {
    "id": "uuid",
    "name": "John Doe",
    "phone": "052-1234567",
    "email": "john@example.com",
    "createdAt": "2026-01-06T12:00:00.000Z",
    "updatedAt": "2026-01-06T12:00:00.000Z"
  }
]
```

### Create Contact

**POST** `/contacts`

Create a new contact.

**Request Body:**
```json
{
  "name": "John Doe",      // required
  "phone": "052-1234567",  // required
  "email": "john@example.com"  // optional
}
```

**Response:** `201 Created`
```json
{
  "id": "uuid",
  "name": "John Doe",
  "phone": "052-1234567",
  "email": "john@example.com",
  "createdAt": "2026-01-06T12:00:00.000Z",
  "updatedAt": "2026-01-06T12:00:00.000Z"
}
```

**Error Response:** `400 Bad Request`
```json
{
  "error": "Validation error message"
}
```

### Update Contact

**PUT** `/contacts/:id`

Update an existing contact.

**Request Body:**
```json
{
  "name": "Jane Doe",      // required
  "phone": "053-7654321",  // required
  "email": "jane@example.com"  // optional
}
```

**Response:** `200 OK`
```json
{
  "id": "uuid",
  "name": "Jane Doe",
  "phone": "053-7654321",
  "email": "jane@example.com",
  "createdAt": "2026-01-06T12:00:00.000Z",
  "updatedAt": "2026-01-06T12:05:00.000Z"
}
```

**Error Responses:**
- `404 Not Found` - Contact not found
- `400 Bad Request` - Validation error

### Delete Contact

**DELETE** `/contacts/:id`

Delete a contact.

**Response:** `200 OK` (empty body)

**Error Response:**
- `404 Not Found` - Contact not found

## Error Handling

All errors return JSON with an `error` field:

```json
{
  "error": "Error message description"
}
```

### HTTP Status Codes

- `200 OK` - Successful GET, PUT, DELETE
- `201 Created` - Successful POST
- `400 Bad Request` - Validation error
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## Data Types

### Contact

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string (UUID) | - | Auto-generated unique identifier |
| name | string | Yes | Contact name |
| phone | string | Yes | Phone number |
| email | string \| null | No | Email address (can be empty/null) |
| createdAt | string (ISO 8601) | - | Creation timestamp |
| updatedAt | string (ISO 8601) | - | Last update timestamp |

## CORS

The API accepts requests from:
- `http://localhost:5173` (Frontend development server)

## Notes

- Search is case-insensitive and matches partial strings
- Empty email strings are converted to `null`
- Contacts are ordered by `createdAt` DESC (newest first)
- All timestamps are in ISO 8601 format

