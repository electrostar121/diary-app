import express from "express";
import {
    createEntry,
    getAllEntries,
    getEntryById,
    updateEntry,
    deleteEntry,
} from "../controllers/diaryController.js";
import { ensureAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
* @route GET /api/diary
* @desc Fetch all diary entries
* @access Public (Authentication will be added in Part 2)
*/
router.get("/", ensureAuthenticated, getAllEntries);

/**
* @route GET /api/diary/:id
* @desc Fetch a specific diary entry by ID
* @access Public (Authentication will be added in Part 2)
*/
router.get("/:id", ensureAuthenticated, getEntryById);

router.post("/", ensureAuthenticated, createEntry);

router.put("/:id", ensureAuthenticated, updateEntry);

router.delete("/:id", ensureAuthenticated, deleteEntry);

export default router;