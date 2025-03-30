import express from "express";
import {
    createEntry,
    getAllEntries,
    getEntryById,
    updateEntry,
    deleteEntry,
} from "../controllers/diaryController.js";

const router = express.Router();

/**
* @route GET /api/diary
* @desc Fetch all diary entries
* @access Public (Authentication will be added in Part 2)
*/
router.get("/", getAllEntries);

/**
* @route GET /api/diary/:id
* @desc Fetch a specific diary entry by ID
* @access Public (Authentication will be added in Part 2)
*/
router.get("/:id", getEntryById);

router.post("/", createEntry);

router.put("/:id", updateEntry);

router.delete("/:id", deleteEntry);

export default router;