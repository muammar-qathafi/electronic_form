# API Documentation

This document provides detailed information about the E-Form K-Link API endpoints.

## Base URL

```
http://localhost:3000/api
```

## Authentication

Most endpoints require authentication using JWT (JSON Web Token). Include the token in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

## Response Format

All API responses follow this format:

### Success Response
```json
{
  "success": true,
  "data": { /* response data */ },
  "message": "Optional success message"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "details": { /* optional error details */ }
}
```

## Endpoints

### User Authentication

#### Register New User

```http
POST /api/users/register
```

**Request Body:**
```json
{
  "username": "string (required)",
  "email": "string (required)",
  "password": "string (required)",
  "fullName": "string (optional)"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "username": "string",
      "email": "string",
      "fullName": "string",
      "createdAt": "ISO date"
    },
    "token": "JWT token"
  }
}
```

#### Login

```http
POST /api/users/login
```

**Request Body:**
```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "username": "string",
      "email": "string",
      "fullName": "string"
    },
    "token": "JWT token"
  }
}
```

#### Get User Profile

```http
GET /api/users/profile
```

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "username": "string",
    "email": "string",
    "fullName": "string",
    "createdAt": "ISO date"
  }
}
```

#### Update Profile

```http
PUT /api/users/profile
```

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "fullName": "string (optional)",
  "email": "string (optional)"
}
```

#### Logout

```http
POST /api/users/logout
```

**Headers:**
```
Authorization: Bearer {token}
```

---

### Form Templates

#### Get All Templates

```http
GET /api/forms/templates
```

**Query Parameters:**
- `category` (optional) - Filter by category (HR, IT, Procurement, etc.)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "category": "string",
      "fields": [
        {
          "id": "string",
          "label": "string",
          "type": "string",
          "required": boolean,
          "options": ["array (for select fields)"]
        }
      ]
    }
  ],
  "count": number
}
```

#### Get Template by ID

```http
GET /api/forms/templates/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "description": "string",
    "category": "string",
    "fields": [...]
  }
}
```

---

### Form Submissions

#### Submit Form

```http
POST /api/forms/submit
```

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "templateId": "string (required)",
  "data": {
    "field1": "value1",
    "field2": "value2"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "templateId": "string",
    "templateName": "string",
    "data": {},
    "userId": "uuid",
    "status": "pending",
    "submittedAt": "ISO date",
    "updatedAt": "ISO date"
  }
}
```

#### Get User Submissions

```http
GET /api/forms/submissions
```

**Headers:**
```
Authorization: Bearer {token}
```

**Query Parameters:**
- `status` (optional) - Filter by status (pending, approved, rejected)
- `templateId` (optional) - Filter by template ID

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "templateId": "string",
      "templateName": "string",
      "data": {},
      "status": "string",
      "submittedAt": "ISO date",
      "updatedAt": "ISO date"
    }
  ],
  "count": number
}
```

#### Get Submission by ID

```http
GET /api/forms/submissions/:id
```

**Headers:**
```
Authorization: Bearer {token}
```

#### Update Submission

```http
PUT /api/forms/submissions/:id
```

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "data": {
    "field1": "newValue"
  },
  "status": "approved"
}
```

#### Delete Submission

```http
DELETE /api/forms/submissions/:id
```

**Headers:**
```
Authorization: Bearer {token}
```

#### Validate Form

```http
POST /api/forms/validate
```

**Request Body:**
```json
{
  "templateId": "string",
  "data": {
    "field1": "value1"
  }
}
```

**Response:**
```json
{
  "success": true,
  "isValid": boolean,
  "errors": [
    {
      "field": "string",
      "message": "string"
    }
  ]
}
```

---

### K-Link Documents

#### Upload Document

```http
POST /api/klink/documents/upload
```

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "title": "string (required)",
  "description": "string (optional)",
  "content": "string (required)",
  "metadata": {}
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "klinkId": "string",
    "title": "string",
    "description": "string",
    "content": "string",
    "metadata": {},
    "userId": "uuid",
    "uploadedAt": "ISO date",
    "status": "active"
  }
}
```

#### Get User Documents

```http
GET /api/klink/documents
```

**Headers:**
```
Authorization: Bearer {token}
```

**Query Parameters:**
- `status` (optional) - Filter by status
- `search` (optional) - Search in title and description

#### Get Document by ID

```http
GET /api/klink/documents/:id
```

**Headers:**
```
Authorization: Bearer {token}
```

#### Delete Document

```http
DELETE /api/klink/documents/:id
```

**Headers:**
```
Authorization: Bearer {token}
```

#### Share Document

```http
POST /api/klink/documents/:id/share
```

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "userIds": ["uuid1", "uuid2"]
}
```

#### Get Shared Users

```http
GET /api/klink/documents/:id/shared-with
```

**Headers:**
```
Authorization: Bearer {token}
```

#### Search Documents

```http
GET /api/klink/search?query=searchterm
```

**Headers:**
```
Authorization: Bearer {token}
```

**Query Parameters:**
- `query` (required) - Search query string

---

## Error Codes

| Status Code | Description |
|------------|-------------|
| 200 | Success |
| 201 | Resource created |
| 400 | Bad request |
| 401 | Unauthorized |
| 404 | Resource not found |
| 409 | Conflict (e.g., duplicate user) |
| 500 | Internal server error |

## Rate Limiting

Currently, there is no rate limiting implemented. For production use, consider implementing rate limiting to prevent abuse.

## Examples

### cURL Examples

#### Register User
```bash
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "securepassword",
    "fullName": "John Doe"
  }'
```

#### Login
```bash
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securepassword"
  }'
```

#### Submit Form
```bash
curl -X POST http://localhost:3000/api/forms/submit \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "templateId": "template-001",
    "data": {
      "employeeName": "John Doe",
      "employeeId": "EMP123",
      "leaveType": "Annual Leave",
      "startDate": "2026-05-01",
      "endDate": "2026-05-05",
      "reason": "Family vacation"
    }
  }'
```

### JavaScript/Fetch Examples

#### Login
```javascript
const response = await fetch('http://localhost:3000/api/users/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'john@example.com',
    password: 'securepassword'
  })
});

const result = await response.json();
const token = result.data.token;
```

#### Get Templates
```javascript
const response = await fetch('http://localhost:3000/api/forms/templates', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

const result = await response.json();
const templates = result.data;
```

---

## Notes

- This API uses in-memory storage for demonstration purposes
- For production use, implement a real database (PostgreSQL, MongoDB, etc.)
- The K-Link integration is simulated and should be replaced with actual API calls
- Always use HTTPS in production environments
- Store JWT tokens securely (not in localStorage for sensitive applications)
