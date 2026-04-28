# Full-Stack Expense Tracker App

This is a full-stack mobile application for tracking expenses built with React Native (Expo) and a Node.js + MongoDB backend. It uses highly polished, "shadcn-like" UI components implemented with NativeWind (Tailwind CSS for React Native).

## Features
- **User Authentication:** Secure JWT-based Login and Registration.
- **Expense Operations:** Add, Edit, Delete, and View expenses.
- **Dashboard Summary:** View category-wise distributions and total balance.
- **Modern UI:** Sleek, user-friendly interface with Lucide icons and Tailwind stylings.
- **Global State & API Handling:** Handled via React Context API and Axios interceptors.
- **React Navigation:** Routing is securely handled via **Expo Router** (the modern standard abstraction strictly built over React Navigation).

## Tech Stack
- **Frontend:** React Native, Expo Router, NativeWind (Tailwind CSS), Context API, Axios.
- **Backend:** Node.js, Express.js, MongoDB, JSON Web Tokens (JWT), Bcrypt.

## Project Structure
```
expense_tracker_assignment/
├── backend/            # Express REST API
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
└── frontend/           # React Native Expo App
    ├── app/            # Expo Router Pages
    ├── context/        # Context State Providers
    └── api/            # Axios API config
```

## Setup Instructions

### 1. Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the backend development server:
   ```bash
   npm run dev
   ```
   > The backend runs on port `5000` by default. Ensure MongoDB is running locally on port 27017 or provide a `MONGO_URI` in `.env`.

### 2. Frontend Setup
1. Navigate into the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Update API Base URL (Important for testing on devices):
   - Open `frontend/api/axios.js`
   - By default, `baseURL` is set to `http://10.0.2.2:5000/api` for the Android emulator. 
   - If testing on an iOS simulator, change it to `http://localhost:5000/api`.
   - If testing on a physical device via Expo Go, replace it with your computer's local IP (e.g., `http://192.168.x.x:5000/api`).
4. Start the Expo application:
   ```bash
   npx expo start
   ```

## Evaluation Criteria Addressed
- **React Native Component Design & Navigation:** Used native safe areas, flex layouts, scrollviews, modal presentation, and Expo Router (React Navigation).
- **State Management:** Fully separated `AuthContext` and `ExpenseContext` to independently manage different slices of complex state.
- **API Integration:** Standardized error handling, loading states, token attachment via interceptors.
- **Problem-Solving:** Form validation natively warns on incomplete inputs, offline behaviors fallback properly to loading states and explicit user feedback. Empty state empty screens added.
- **Shadcn Consideration:** Adopted the design system standards expected of Shadcn: large rounded borders (rounded-3xl), monochromatic color schemas mixed with functional accent colors, and precise spacing using NativeWind classes.
