# Falcon Auth API - Quick Setup Guide

## 🚀 Quick Start (3 Steps)

### Step 1: Environment Setup

```bash
# Copy environment template
cp .env.example .env

# Edit .env file with your MongoDB URI
# For local MongoDB: mongodb://localhost:27017/falconauth
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/falconauth
```

### Step 2: Install Dependencies (Already Done!)

```bash
npm install
```

### Step 3: Start Server

```bash
npm start
```

## 📊 Database Options

### Option A: MongoDB Atlas (Recommended - Free Cloud Database)

1. Go to https://www.mongodb.com/atlas
2. Create free account
3. Create a cluster
4. Create database user
5. Get connection string
6. Update MONGODB_URI in .env file

### Option B: Local MongoDB

1. Download MongoDB Community: https://www.mongodb.com/try/download/community
2. Install and start MongoDB service
3. Use default URI: `mongodb://localhost:27017/falconauth`

### Option C: Docker MongoDB

```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

## 🧪 Testing Your API

### 1. Health Check

Open browser: http://localhost:3000/health

### 2. Using PowerShell (Windows)

```powershell
# Signup
Invoke-RestMethod -Uri "http://localhost:3000/api/auth/signup" -Method POST -ContentType "application/json" -Body '{"name":"John Doe","email":"john@example.com","password":"Password123"}'

# Login
Invoke-RestMethod -Uri "http://localhost:3000/api/auth/login" -Method POST -ContentType "application/json" -Body '{"email":"john@example.com","password":"Password123"}'
```

### 3. Using Postman

Import the collection from SAMPLE_REQUESTS.md

## 📁 Project Structure Summary

```
falcon-auth/
├── models/User.js          # User schema with password hashing
├── routes/auth.js          # Signup, Login, Profile routes
├── middleware/
│   ├── auth.js            # JWT verification
│   ├── validation.js      # Input validation
│   └── errorHandler.js    # Error handling
├── utils/jwt.js           # JWT utilities
├── app.js                 # Main application
├── .env                   # Environment variables
└── README.md              # Full documentation
```

## ✅ Checklist for Submission

- [ ] MongoDB connection working
- [ ] Server starts without errors
- [ ] Signup endpoint creates users
- [ ] Login endpoint returns JWT
- [ ] Profile endpoint requires valid JWT
- [ ] Passwords are hashed with bcrypt
- [ ] Input validation working
- [ ] Error handling implemented
- [ ] README.md completed
- [ ] Code pushed to GitHub
- [ ] .env.example provided

## 🔧 Troubleshooting

### Server won't start?

- Check if MongoDB is running
- Verify MONGODB_URI in .env
- Check if port 3000 is available

### MongoDB connection failed?

- For Atlas: Check username/password and IP whitelist
- For local: Ensure MongoDB service is running
- Test connection string separately

### JWT errors?

- Verify JWT_SECRET is set in .env
- Check token format in Authorization header

## 🎯 API Endpoints Summary

| Method | Endpoint            | Description      | Auth Required |
| ------ | ------------------- | ---------------- | ------------- |
| GET    | `/health`           | Health check     | No            |
| POST   | `/api/auth/signup`  | Create user      | No            |
| POST   | `/api/auth/login`   | Login user       | No            |
| GET    | `/api/auth/profile` | Get user profile | Yes           |

## 📋 Next Steps for Submission

1. **Test all endpoints** using Postman or PowerShell
2. **Create GitHub repository**
3. **Push code to GitHub**
4. **Update README** with your specific setup
5. **Submit via Google Form**

Good luck with your assignment! 🎉
