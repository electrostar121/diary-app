import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import router from "./routes/diaryRoutes.js";
import authRoutes from "./routes/authRoutes.js";

import "./config/passport.js";

dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use("/api/diary", router);

app.get("/", (req, res) => {
    res.send("Welcome to ThoughtStream API");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});