import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import router from "./routes/diaryRoutes.js";

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.use("/api/diary", router);

app.get("/", (req, res) => {
    res.send("Welcome to ThoughtStream API");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});