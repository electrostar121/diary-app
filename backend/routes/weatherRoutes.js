import express from "express";
import { getWeather } from "../controllers/weatherController.js";
import authenticateJWT  from "../middleware/authMiddleware.js";

const weatherRoutes = express.Router();

/**
* @route GET /api/weather
* @desc Fetch current weather
* @access Public 
*/
weatherRoutes.get("/", authenticateJWT, getWeather);

export default weatherRoutes;