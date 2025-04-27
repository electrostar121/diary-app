import express from "express";
import { handleGoogleLogin } from "../controllers/authController.js";
const router = express.Router();
router.post("/google", handleGoogleLogin); // POST /api/auth/google
export default router;