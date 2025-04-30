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
MONGO_URI="mongodb+srv://<username>:<password>@cluster0.nahw65o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
WEATHER_API="<open weather api token>"
GOOGLE_CLIENT_ID=<google client id>
GOOGLE_CLIENT_SECRET=<google client secret>
GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback
SESSION_SECRET=<64 char generated secret>
PORT=5000
JWT_SECRET=<user generated secret>
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
CLIENT_SECRET=secret-key-from-google-ouath
```

### Step 3: Setup the OAuth Client 

LINK: https://www.youtube.com/watch?v=GuHN_ZqHExs

### Step 4: 
```bash
npm run dev
```