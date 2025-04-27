# ThoughtStream - Full Stack Diary Application 📝

ThoughtStream is a personal diary application built with:

-  Backend: Node.js + Express + MongoDB
-  Frontend: React + Vite + Google OAuth login
-  JWT authentication for secure access

---

##  Project Setup Instructions

This project contains **two parts**:

- **Backend** (Express API)
- **Frontend** (React Vite App)

##  Backend Setup

### Step 1: Go to Backend Folder

```bash
cd backend
npm install
```

### Step 2: Create .env file in backend

```
PORT=5000
MONGO_URI=your-mongodb-connection-uri
JWT_SECRET=your-very-secure-random-string
GOOGLE_CLIENT_ID=your-google-oauth-client-id
```

### Step 3: Start Backend Server

```bash
npm start
```

##  Frontend Setup
### Step 1: Go to Frontend Folder
```bash
cd frontend
npm install
npm install @react-oauth/google
```

### Step 2: Create .env file in frontend

```
VITE_API_BASE_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your-google-oauth-client-id
```

### Step 3: Setup the OAuth Client 

LINK: https://www.youtube.com/watch?v=GuHN_ZqHExs

### Step 4: 
```bash
npm run dev
```