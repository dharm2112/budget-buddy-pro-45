# Backend API - Quick Start Guide

## ✅ Server Status
**Backend is running on: http://localhost:5000**

## 🚀 Starting the Server

### Option 1: Using start.bat (Recommended for Windows)
```bash
cd Backend
.\start.bat
```

### Option 2: Using Node directly
```bash
cd Backend
node server.js
```

### Option 3: Using npm
```bash
cd Backend
npm start
```

## 🔗 API Base URL
```
http://localhost:5000/api
```

## 📋 Quick Test Endpoints

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Register a New User
```bash
curl -X POST http://localhost:5000/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"firstName\":\"John\",\"lastName\":\"Doe\",\"email\":\"john@example.com\",\"password\":\"password123\",\"department\":\"Sales\"}"
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"john@example.com\",\"password\":\"password123\"}"
```

### Get All Expenses (Requires Token)
```bash
curl http://localhost:5000/api/expenses ^
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

### Create Expense (Requires Token)
```bash
curl -X POST http://localhost:5000/api/expenses ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" ^
  -d "{\"merchant\":\"Uber\",\"category\":\"Travel\",\"amount\":2500,\"currency\":\"INR\",\"description\":\"Client meeting\"}"
```

## 🗄️ Database Connection
- **MongoDB Atlas**: Connected
- **Database Name**: expense_management
- **Connection Status**: ✅ Active

## 📁 Available Endpoints

### Authentication (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - Login user
- `GET /me` - Get current user (Protected)

### Expenses (`/api/expenses`)
- `GET /` - Get all expenses (Protected)
- `GET /:id` - Get single expense (Protected)
- `POST /` - Create expense (Protected)
- `PUT /:id` - Update expense (Protected)
- `DELETE /:id` - Delete expense (Protected)
- `GET /stats/summary` - Get expense statistics (Protected)

### Approvals (`/api/approvals`) - Manager/Admin Only
- `GET /pending` - Get pending approvals
- `GET /stats` - Get approval statistics
- `PUT /:id/approve` - Approve expense
- `PUT /:id/reject` - Reject expense

### Reports (`/api/reports`)
- `GET /` - Get expense reports with filters (Protected)
- `GET /trends` - Get monthly trends (Protected)
- `GET /export` - Export expenses (Protected)

### Users (`/api/users`)
- `GET /` - Get all users (Admin only)
- `GET /:id` - Get single user (Protected)
- `PUT /:id` - Update user (Protected)
- `DELETE /:id` - Delete user (Admin only)

## 🔐 Authentication
All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## 👥 User Roles
- **employee**: Can manage their own expenses
- **manager**: Can approve/reject expenses and view all expenses
- **admin**: Full access to all features

## 🛠️ Environment Variables
Located in `.env` file:
- `PORT=5000`
- `MONGODB_URI=<your_mongodb_connection_string>`
- `JWT_SECRET=<your_secret_key>`
- `JWT_EXPIRE=7d`
- `NODE_ENV=development`

## 📊 Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "errors": [ ... ]
}
```

## 🧪 Testing with Postman
1. Import the API endpoints into Postman
2. Register a new user
3. Login to get JWT token
4. Use the token in Authorization header for protected routes

## 📝 Notes
- Server automatically connects to MongoDB on startup
- All passwords are hashed using bcrypt
- JWT tokens expire in 7 days by default
- CORS is enabled for all origins in development
