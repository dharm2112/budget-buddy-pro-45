# Expense Management Backend API

A RESTful API built with Node.js, Express, and MongoDB for managing expenses, approvals, and reports.

## 🚀 Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **Expense Management**: Create, read, update, and delete expenses
- **Approval Workflow**: Manager/Admin approval system for expenses
- **Reports & Analytics**: Generate reports with filtering and export capabilities
- **User Management**: User profile and account management

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB instance
- npm or yarn

## 🛠️ Installation

1. Navigate to the Backend directory:
```bash
cd Backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - The `.env` file is already configured with MongoDB connection string
   - Update `JWT_SECRET` for production use

4. Start the server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Expenses
- `GET /api/expenses` - Get all expenses (Protected)
- `GET /api/expenses/:id` - Get single expense (Protected)
- `POST /api/expenses` - Create expense (Protected)
- `PUT /api/expenses/:id` - Update expense (Protected)
- `DELETE /api/expenses/:id` - Delete expense (Protected)
- `GET /api/expenses/stats/summary` - Get expense statistics (Protected)

### Approvals (Manager/Admin only)
- `GET /api/approvals/pending` - Get pending approvals
- `GET /api/approvals/stats` - Get approval statistics
- `PUT /api/approvals/:id/approve` - Approve expense
- `PUT /api/approvals/:id/reject` - Reject expense

### Reports
- `GET /api/reports` - Get expense reports with filters (Protected)
- `GET /api/reports/trends` - Get monthly trends (Protected)
- `GET /api/reports/export` - Export expenses to CSV format (Protected)

### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get single user (Protected)
- `PUT /api/users/:id` - Update user (Protected)
- `DELETE /api/users/:id` - Delete user (Admin only)

## 🔐 User Roles

- **employee**: Can manage their own expenses
- **manager**: Can approve/reject expenses and view all expenses
- **admin**: Full access to all features

## 📝 Request Examples

### Register User
```json
POST /api/auth/register
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "department": "Sales"
}
```

### Login
```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Create Expense
```json
POST /api/expenses
Headers: { "Authorization": "Bearer <token>" }
{
  "merchant": "Uber",
  "category": "Travel",
  "amount": 2500,
  "currency": "INR",
  "date": "2025-01-15",
  "description": "Client meeting transportation"
}
```

### Approve Expense
```json
PUT /api/approvals/:id/approve
Headers: { "Authorization": "Bearer <token>" }
{
  "notes": "Approved for business travel"
}
```

## 🗂️ Project Structure

```
Backend/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── expenseController.js # Expense CRUD operations
│   ├── approvalController.js# Approval workflow
│   ├── reportController.js  # Reports and analytics
│   └── userController.js    # User management
├── middleware/
│   ├── auth.js              # JWT authentication
│   └── validation.js        # Request validation
├── models/
│   ├── User.js              # User schema
│   └── Expense.js           # Expense schema
├── routes/
│   ├── authRoutes.js
│   ├── expenseRoutes.js
│   ├── approvalRoutes.js
│   ├── reportRoutes.js
│   └── userRoutes.js
├── .env                     # Environment variables
├── .gitignore
├── package.json
├── server.js                # Entry point
└── README.md
```

## 🧪 Testing the API

You can test the API using:
- Postman
- Thunder Client (VS Code extension)
- cURL commands

Example cURL:
```bash
# Health check
curl http://localhost:5000/api/health

# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","lastName":"Doe","email":"john@example.com","password":"password123"}'
```

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| MONGODB_URI | MongoDB connection string | (configured) |
| JWT_SECRET | Secret key for JWT | (change in production) |
| JWT_EXPIRE | JWT expiration time | 7d |
| NODE_ENV | Environment mode | development |

## 📦 Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **jsonwebtoken**: JWT authentication
- **bcryptjs**: Password hashing
- **express-validator**: Request validation
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variables
- **morgan**: HTTP request logger
- **multer**: File upload handling

## 🚨 Error Handling

The API returns consistent error responses:
```json
{
  "success": false,
  "message": "Error message here",
  "errors": [] // Validation errors if any
}
```

## 📄 License

ISC
