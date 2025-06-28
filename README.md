# Squad-8 Project API

A comprehensive REST API for user authentication and private data access built with Node.js, Express, and MongoDB.

## Features

- User registration and authentication
- JWT-based authentication
- Password hashing with bcrypt
- MongoDB integration with Mongoose
- Comprehensive API documentation with Swagger
- Private route protection

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   JWT_SECRET=your_jwt_secret_here
   JWT_EXPIRE=30d
   MONGO_URI=your_mongodb_connection_string
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## API Documentation

Once the server is running, you can access the interactive API documentation at:

**http://localhost:5000/api-docs**

The Swagger UI provides:
- Complete API endpoint documentation
- Request/response schemas
- Interactive testing interface
- Authentication examples

## API Endpoints

### Authentication Routes

#### POST /api/auth/register
Register a new user account.

**Request Body:**
```json
{
  "FIRST_NAME": "John",
  "LAST_NAME": "Doe",
  "EMAIL_ADDRESS": "john.doe@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "FIRST_NAME": "John",
    "LAST_NAME": "Doe",
    "EMAIL_ADDRESS": "john.doe@example.com",
    "CREATED_ON": "2023-01-01T00:00:00.000Z"
  }
}
```

#### POST /api/auth/login
Authenticate an existing user.

**Request Body:**
```json
{
  "EMAIL_ADDRESS": "john.doe@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "FIRST_NAME": "John",
    "LAST_NAME": "Doe",
    "EMAIL_ADDRESS": "john.doe@example.com",
    "CREATED_ON": "2023-01-01T00:00:00.000Z"
  }
}
```

### Private Routes

#### GET /api/private
Access private data (requires authentication).

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Response:**
```json
{
  "success": true,
  "message": "you got private data"
}
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. To access protected routes:

1. Register or login to get a JWT token
2. Include the token in the Authorization header:
   ```
   Authorization: Bearer <your_jwt_token>
   ```

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "error": "Error message description"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

## Development

To run the development server with auto-reload:
```bash
npm run dev
```

## Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Swagger** - API documentation
- **dotenv** - Environment variables

## License

ISC 