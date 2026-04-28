# Expense Tracker Assignment

A full-stack expense tracking application built with **React Native (Expo)** and **Node.js + MongoDB**. Features JWT-based authentication, CRUD operations for expenses, category-wise summaries, and a modern UI with a custom blue gradient theme.

## 📋 Project Overview

This project fulfills all assignment requirements:
- ✅ **User Authentication** - JWT-based Login/Register with bcrypt password hashing
- ✅ **Expense CRUD** - Add, Edit, Delete expense records with amount, category, date, and notes
- ✅ **Dashboard** - Category-wise expense summary with total balance calculation
- ✅ **REST API** - Express.js backend with MongoDB integration
- ✅ **Loading/Error States** - Comprehensive error handling and loading indicators across all pages
- ✅ **Modern UI** - Responsive design with custom blue gradient color theme

---

## 🎨 Color Theme

**Custom Blue Gradient Palette:**
- **#03045e** - Dark Background (Deep Ocean Blue)
- **#0077b6** - Input Fields (Medium Ocean Blue)
- **#00b4d8** - Buttons & Accents (Bright Cyan)
- **#90e0ef** - Secondary Text (Light Blue-Gray)
- **#caf0f8** - Primary Text (Very Light Blue)

---

## 🏗️ Architecture

### Frontend Structure
```
frontend/
├── app/
│   ├── (auth)/          # Authentication pages (Login, Register)
│   ├── (app)/           # Protected routes (Dashboard, Add, Edit)
│   ├── _layout.js       # Root layout with auth routing
│   └── index.js         # Splash screen
├── components/
│   └── TransactionItem.js    # Reusable expense card with hover actions
├── context/
│   ├── AuthContext.js        # User authentication state
│   └── ExpenseContext.js     # Expense data management
├── api/
│   └── axios.js              # Configured axios client with JWT interceptor
├── assets/
│   ├── images/               # Category icons
│   ├── loading.json          # Lottie loading animation
│   └── no-items.json         # Empty state animation
└── package.json
```

### Backend Structure
```
backend/
├── controllers/
│   ├── authController.js     # Register, Login, Get User
│   └── expenseController.js  # CRUD operations + Category summary
├── middleware/
│   └── authMiddleware.js     # JWT verification
├── models/
│   ├── User.js              # User schema with password hashing
│   └── Expense.js           # Expense schema with references
├── routes/
│   ├── authRoutes.js        # /api/auth endpoints
│   └── expenseRoutes.js     # /api/expenses endpoints
├── server.js                # Express server setup
└── package.json
```

---

## 🚀 Tech Stack

### Frontend
- **React Native** 0.81.5 - Cross-platform UI framework
- **Expo** 54.0 - Development and deployment platform
- **Expo Router** 6.0 - File-based routing (replaces React Navigation)
- **React Context API** - State management (AuthContext, ExpenseContext)
- **Axios** 1.15 - HTTP client with JWT interceptors
- **Lucide React Native** 1.11 - Icon library
- **Lottie** - Animations (loading, empty states)
- **Expo Linear Gradient** - Card background gradients
- **Date-fns** 4.1 - Date formatting
- **AsyncStorage** - Token persistence

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** 5.2 - Web framework
- **MongoDB** - NoSQL database (Atlas)
- **Mongoose** 9.5 - ODM for MongoDB
- **JWT** (jsonwebtoken 9.0) - Token-based authentication
- **Bcryptjs** 3.0 - Password hashing
- **CORS** 2.8 - Cross-origin requests
- **Dotenv** 17.4 - Environment variables
- **Nodemon** 3.1 - Development server auto-reload

---

## � Security Setup (IMPORTANT!)

1. **Create `.env` file in `backend/` directory:**
   ```bash
   cd backend
   cp .env.example .env
   ```

2. **Update with your actual credentials:**
   ```env
   MONGO_URI=mongodb+srv://your_username:password@cluster.mongodb.net/database
   JWT_SECRET=your-secure-random-string
   PORT=5000
   ```

3. **⚠️ NEVER commit `.env` to git** - it's already in `.gitignore`
   - `.env` contains sensitive database credentials
   - Always use `.env.example` for public repository

---

## 🔧 Setup & Running

### Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Security: Set up .env file (see Security Setup section above)

# Start development server
npm run dev
# Backend runs on http://localhost:5000
```

### Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start Expo development server (Web)
npm run web
# Frontend runs on http://localhost:8081

# Alternative platforms
npm start         # Interactive menu
npm run android   # Android emulator
npm run ios       # iOS simulator
```

---

## 📱 Features & Pages

### Authentication Flow
- **Login Page** - Email/password login with JWT token generation
- **Register Page** - Create account with name, email, password
- **Token Persistence** - AsyncStorage keeps user logged in across sessions
- **Protected Routes** - Automatic redirect to login if not authenticated

### Main Application
- **Dashboard** - View all expenses with category breakdown and total balance
  - Pull-to-refresh to reload transactions
  - Category-wise summary pills
  - Gradient balance card
  - Empty state animation when no expenses
  
- **Add Transaction** - Create new expense
  - Amount input with currency symbol
  - Category selection (Food, Transport, Utilities, Entertainment, Shopping, Other)
  - Optional description/notes
  - Form validation
  
- **Edit Transaction** - Modify existing expense
  - Pre-filled values from database
  - Update any field
  - Delete button in header
  
- **Transaction Cards** - Hover-activated edit/delete buttons
  - Shows category icon, amount, date, notes
  - Responsive design for desktop and mobile
  - Visual feedback on hover

---

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register         - Register new user (name, email, password)
POST   /api/auth/login            - Login (email, password)
GET    /api/auth/me               - Get current user (requires auth)
```

### Expenses
```
POST   /api/expenses              - Create expense (amount, category, date, note)
GET    /api/expenses              - Get all user's expenses
GET    /api/expenses/summary      - Get category-wise breakdown
PUT    /api/expenses/:id          - Update expense
DELETE /api/expenses/:id          - Delete expense
```

**Security:**
- JWT tokens sent as `Authorization: Bearer <token>`
- All expense routes require authentication
- User ownership verified on update/delete operations

---

## 📦 Unnecessary Dependencies Identified

The following dependencies are installed but **not actively used** in the current implementation:

### Not Used (Can be Removed)
1. `@react-navigation/*` - Replaced by Expo Router for routing
2. `@expo/vector-icons` - Using Lucide React Native for icons instead
3. `nativewind` - Converted to inline React Native styles
4. `tailwindcss` - Converted to inline styles (not using Tailwind classes)
5. `expo-haptics` - No haptic feedback implemented
6. `expo-constants` - Not referenced in code
7. `expo-font` - Custom fonts not used
8. `expo-image` - Standard Image component used instead
9. `expo-symbols` - Not used
10. `expo-system-ui` - Not customized
11. `expo-web-browser` - Not implemented
12. `react-native-chart-kit` - Not used (categories shown as pills instead)
13. `react-native-worklets` - Not needed
14. **Babel plugin** `nativewind/babel` - Can be removed from babel.config.js

### Why They're Still There
- **Safety**: Removing nested dependencies could break indirect requirements
- **Future-proofing**: Available if features are added later
- **Stability**: Prevents need for re-testing after cleanup

### To Clean Up (Optional)
```bash
npm uninstall nativewind tailwindcss @react-navigation/bottom-tabs \
  @react-navigation/elements @react-navigation/native @expo/vector-icons \
  expo-haptics react-native-chart-kit

# Update babel.config.js - remove 'nativewind/babel' plugin
```

---

## 🔄 Data Flow

```
User Input → Page Component → useContext(AuthContext/ExpenseContext)
    ↓
Context Calls API → Axios (with JWT interceptor)
    ↓
Backend Validates JWT → Database Operation
    ↓
Response → Update Context State → Re-render UI
    ↓
Success/Error Alert + Loading State Management
```

### Authentication Flow
```
Register/Login → API Call → JWT Generated → AsyncStorage (persist token)
    ↓
Navigate to Dashboard → LoadUser (on app start) → Verify token valid
    ↓
If expired/invalid → Clear storage → Redirect to Login
```

---

## 🛡️ Security Features

- **Password Hashing** - Bcryptjs with salt rounds
- **JWT Tokens** - 5-hour expiration
- **CORS Enabled** - Cross-origin requests controlled
- **Auth Middleware** - All protected routes verify JWT
- **User Isolation** - Expenses filtered by user ID
- **Ownership Verification** - Update/delete only own expenses

---

## ⚡ Performance Optimizations

- **AsyncStorage** - Fast local token access
- **Context API** - Efficient state management
- **FlatList** - Optimized expense list rendering
- **Refresh Control** - Pull-to-refresh data
- **Error Boundaries** - Graceful error handling
- **Lazy Loading** - Route-based code splitting

---

## 🐛 Error Handling

- **Network Errors** - "Failed to load expenses. Check network." message
- **Auth Errors** - "Invalid Credentials" on failed login
- **Validation** - Form validation on all inputs
- **Loading States** - Spinner shows during API calls
- **Alerts** - User-friendly error messages
- **Empty States** - Lottie animations when no data

---

## 🎓 Key Improvements Made

- ✅ Fixed API configuration to use `localhost:5000` for web browsers
- ✅ Updated entire color theme to blue gradient palette
- ✅ Added hover-state edit/delete buttons on transaction cards
- ✅ Improved delete functionality with proper error handling and logging
- ✅ Fixed amount input visibility on both add and edit pages
- ✅ Added comprehensive error messages and console logging
- ✅ Converted all Tailwind/NativeWind classes to inline styles
- ✅ Fixed navigation flow on auth pages

---

## 📄 License

This is an educational assignment project.
