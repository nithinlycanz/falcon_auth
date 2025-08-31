# Falcon Auth API - Sample Requests

## Prerequisites

Make sure your server is running: `npm start`
Server should be running on: http://localhost:3000

## 1. Health Check

```bash
curl -X GET http://localhost:3000/health
```

## 2. User Signup

```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "Password123"
  }'
```

### Expected Response:

```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "user": {
      "id": "66d123...",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

## 3. User Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "Password123"
  }'
```

## 4. Get Profile (Protected Route)

```bash
# Replace TOKEN with the JWT token from signup/login response
curl -X GET http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer TOKEN"
```

## 5. Error Examples

### Invalid Signup (missing fields):

```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "invalid-email",
    "password": "123"
  }'
```

### Duplicate Email:

```bash
# Try signing up with the same email twice
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "john@example.com",
    "password": "Password123"
  }'
```

### Invalid Login:

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "wrongpassword"
  }'
```

### Access Protected Route Without Token:

```bash
curl -X GET http://localhost:3000/api/auth/profile
```

## Postman Collection

### 1. Create New Collection: "Falcon Auth API"

### 2. Add Requests:

#### Signup

- **Method**: POST
- **URL**: `{{baseUrl}}/api/auth/signup`
- **Headers**:
  - Content-Type: application/json
- **Body** (raw JSON):

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123"
}
```

#### Login

- **Method**: POST
- **URL**: `{{baseUrl}}/api/auth/login`
- **Headers**:
  - Content-Type: application/json
- **Body** (raw JSON):

```json
{
  "email": "john@example.com",
  "password": "Password123"
}
```

#### Get Profile

- **Method**: GET
- **URL**: `{{baseUrl}}/api/auth/profile`
- **Headers**:
  - Authorization: Bearer {{token}}

### 3. Environment Variables:

- `baseUrl`: `http://localhost:3000`
- `token`: (set this from login/signup response)

## Testing Workflow

1. **Start Server**: `npm start`
2. **Health Check**: Verify server is running
3. **Signup**: Create a new user and save the token
4. **Login**: Login with the same credentials
5. **Profile**: Access protected route with token
6. **Error Cases**: Test validation and error handling

## MongoDB Connection

If you don't have MongoDB installed locally:

### Option 1: Install MongoDB locally

- Download from: https://www.mongodb.com/try/download/community
- Start service: `mongod`

### Option 2: Use MongoDB Atlas (Cloud)

1. Create account at https://www.mongodb.com/atlas
2. Create a cluster
3. Get connection string
4. Update MONGODB_URI in .env:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/falconauth
```

### Option 3: Use Docker

```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```
