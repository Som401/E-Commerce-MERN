# E-Commerce MERN Application

Full Stack E-Commerce Platform built with MongoDB, Express.js, React, and Node.js

## 📋 Project Overview

This is a full-featured e-commerce application inspired by Flipkart, built following the 2-week sprint plan. The project includes:

- User authentication and authorization
- Product catalog with search and filters
- Shopping cart and wishlist
- Order management and tracking
- Payment gateway integration (Paytm/Stripe)
- Admin dashboard with analytics
- Email notifications

## 🚀 Technology Stack

### Frontend
- **React 17** - UI Library
- **Redux** - State Management
- **Material-UI** - Component Library
- **Tailwind CSS** - Utility-first CSS
- **React Router v6** - Routing
- **Axios** - HTTP Client
- **Chart.js** - Data Visualization
- **Notistack** - Notifications

### Backend
- **Node.js** - Runtime Environment
- **Express.js** - Web Framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password Hashing
- **Cloudinary** - Image Storage
- **SendGrid/Nodemailer** - Email Service
- **Paytm/Stripe** - Payment Gateways

## 📁 Project Structure

```
E-Commerce-MERN/
├── backend/
│   ├── app.js                 # Express app configuration
│   ├── config/
│   │   ├── config.env         # Environment variables
│   │   └── database.js        # MongoDB connection
│   ├── controllers/           # Request handlers
│   ├── middlewares/           # Custom middleware
│   │   ├── auth.js           # Authentication middleware
│   │   ├── error.js          # Error handling
│   │   └── asyncErrorHandler.js
│   ├── models/               # Mongoose models
│   ├── routes/               # API routes
│   └── utils/                # Utility functions
├── frontend/
│   ├── public/
│   └── src/
│       ├── actions/          # Redux actions
│       ├── reducers/         # Redux reducers
│       ├── components/       # React components
│       ├── constants/        # Action constants
│       ├── Routes/           # Route components
│       ├── utils/            # Utility functions
│       ├── assets/           # Images and static files
│       ├── App.js
│       ├── index.js
│       └── store.js          # Redux store
├── server.js                 # Entry point
├── package.json
└── README.md
```

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd E-Commerce-MERN
```

### 2. Install Backend Dependencies
```bash
npm install
```

### 3. Install Frontend Dependencies
```bash
cd frontend
npm install --legacy-peer-deps
cd ..
```

### 4. Configure Environment Variables

Create `backend/config/config.env` file and add:


### 5. Run the Application

**Run both frontend and backend concurrently:**
```bash
npm run dev
```

**Or run them separately:**

Backend:
```bash
npm start
# Server runs on http://localhost:4000
```

Frontend:
```bash
cd frontend
npm start
# App runs on http://localhost:3000

## 📚 Available Scripts

### Backend
- `npm start` - Start production server
- `npm run server` - Start development server with nodemon
- `npm run dev` - Run both frontend and backend

### Frontend
- `npm start` - Start development server
- `npm run build` - Create production build
- `npm test` - Run tests

## 🤝 Team Collaboration

### Daily Standup (15 minutes @ 9:00 AM)
1. What did you complete yesterday?
2. What will you work on today?
3. Any blockers?

### Code Review Guidelines
- Response time: 2-4 hours
- Check functionality, code quality, no console errors
- Provide constructive feedback

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running locally or check Atlas connection string
- Verify network access in MongoDB Atlas

### Port Already in Use
```bash
# Kill process on port 4000
lsof -ti:4000 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Frontend Dependencies Issues
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```