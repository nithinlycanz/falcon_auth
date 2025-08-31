# Falcon Auth API

A REST API for user authentication with JWT-based token system built with Node.js, Express, and MongoDB.

## Features

- User registration (signup) with input validation
- User login with JWT token generation
- Password hashing with bcrypt
- JWT-based authentication middleware
- Protected routes example
- Comprehensive error handling
- Input validation with meaningful error messages
- MongoDB integration with Mongoose

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **bcrypt** - Password hashing
- **jsonwebtoken** - JWT implementation
- **express-validator** - Input validation
- **dotenv** - Environment variables

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd falcon-auth
```

2. Install dependencies:

```bash
npm install
```

3. Environment Configuration:

```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:

```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/falconauth
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
```

5. Start MongoDB service (if running locally)

6. Start the server:

```bash
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### Health Check

- **GET** `/health` - Check if the server is running

### Authentication

#### Signup

- **POST** `/api/auth/signup`
- **Body**:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123"
}
```

- **Response** (201):

```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "token": "jwt_token"
  }
}
```

#### Login

- **POST** `/api/auth/login`
- **Body**:

```json
{
  "email": "john@example.com",
  "password": "Password123"
}
```

- **Response** (200):

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "token": "jwt_token"
  }
}
```

#### Get Profile (Protected)

- **GET** `/api/auth/profile`
- **Headers**: `Authorization: Bearer <jwt_token>`
- **Response** (200):

```json
{
  "success": true,
  "message": "Profile retrieved successfully",
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

## Sample Requests

### Using cURL

#### Signup

```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "Password123"
  }'
```

#### Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "Password123"
  }'
```

#### Get Profile (replace TOKEN with actual JWT)

```bash
curl -X GET http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer TOKEN"
```

### Using Postman

1. **Signup**

   - Method: POST
   - URL: `http://localhost:3000/api/auth/signup`
   - Headers: `Content-Type: application/json`
   - Body (raw JSON):

   ```json
   {
     "name": "John Doe",
     "email": "john@example.com",
     "password": "Password123"
   }
   ```

2. **Login**

   - Method: POST
   - URL: `http://localhost:3000/api/auth/login`
   - Headers: `Content-Type: application/json`
   - Body (raw JSON):

   ```json
   {
     "email": "john@example.com",
     "password": "Password123"
   }
   ```

3. **Get Profile**
   - Method: GET
   - URL: `http://localhost:3000/api/auth/profile`
   - Headers: `Authorization: Bearer <your_jwt_token>`

## Input Validation

### Signup Validation Rules

- **Name**: Required, minimum 2 characters, letters and spaces only
- **Email**: Required, valid email format
- **Password**: Required, minimum 6 characters, must contain uppercase, lowercase, and number

### Login Validation Rules

- **Email**: Required, valid email format
- **Password**: Required

## Error Responses

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "field_name",
      "message": "Specific error message"
    }
  ]
}
```

### HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized
- `409` - Conflict (duplicate email)
- `500` - Internal Server Error

## Project Structure

```
falcon-auth/
├── models/
│   └── User.js           # User model with Mongoose schema
├── routes/
│   └── auth.js           # Authentication routes
├── middleware/
│   ├── auth.js           # JWT authentication middleware
│   ├── validation.js     # Input validation middleware
│   └── errorHandler.js   # Global error handling
├── utils/
│   └── jwt.js            # JWT utility functions
├── .env.example          # Environment variables template
├── .env                  # Environment variables (not in git)
├── app.js                # Main application file
├── package.json          # Dependencies and scripts
└── README.md             # Project documentation
```

## Security Features

- Password hashing with bcrypt (salt rounds: 12)
- JWT token-based authentication
- Input validation and sanitization
- Protected routes with middleware
- Secure error handling (no sensitive data exposure)
- Environment-based configuration

## Development

To run in development mode with auto-restart:

```bash
npm install -g nodemon
nodemon app.js
```

## Environment Variables

| Variable         | Description               | Default                              |
| ---------------- | ------------------------- | ------------------------------------ |
| `NODE_ENV`       | Environment mode          | development                          |
| `PORT`           | Server port               | 3000                                 |
| `MONGODB_URI`    | MongoDB connection string | mongodb://localhost:27017/falconauth |
| `JWT_SECRET`     | JWT signing secret        | (required)                           |
| `JWT_EXPIRES_IN` | JWT expiration time       | 7d                                   |

## License

ISC

# falcon_auth