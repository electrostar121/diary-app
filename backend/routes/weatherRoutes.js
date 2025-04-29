import express from "express";
import { getLocation, getWeather } from "../controllers/weatherController.js";
import authenticateJWT  from "../middleware/authMiddleware.js";

const weatherRoutes = express.Router();

/**
* @route GET /api/weather
* @desc Fetch current weather
* @access Public 
*/
weatherRoutes.get("/", authenticateJWT, getWeather);
weatherRoutes.get("/location/", authenticateJWT, getLocation);

export default weatherRoutes;