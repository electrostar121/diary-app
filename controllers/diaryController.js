import DiaryEntry from "../models/DiaryEntry.js";
import { fetchWeather } from "./weatherController.js";

export const getAllEntries = async(req, res) => {
    try{
        const { search, tag, location } = req.query;
        let filter = {user: req.user._id}; // No authentication in Part 1, so no user filter is applied
        // Search filter (Matches title or content)
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: "i" } },
                { content: { $regex: search, $options: "i" } }
            ];
        }
        // Tag filter (Exact match)
        if (tag) {
            filter.tags = tag;
        }
        // Location filter (Exact match)
        if (location) {
            filter.location = location;
        }
        // Fetch filtered results and sort by newest first
        const entries = await DiaryEntry.find(filter).sort({ createdAt: -1 });
        res.status(200).json(entries);
    }catch(error){
        res.status(500).json({ message: "Server Error: Unable to fetch diary entries" });
    }
};

export const getEntryById = async(req, res) => {
    try{
        const entry = await DiaryEntry.findById(req.params.id);
        
        if (!entry) {
            return res.status(404).json({ message: "Diary entry not found" });
        }

        if (entry.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Forbidden" });
        }
        
        res.status(200).json(entry);
    }catch(error){
        res.status(500).json({ message: "Server Error: Unable to retrieve diary entry" });
    }
};

export const createEntry = async (req, res) => {
    try {
        const { title, content, reflection, tags, location } = req.body;
        // Fetch weather data if location is provided
        const weatherData = location ? await fetchWeather(location) : null;
        const newEntry = new DiaryEntry({
            user: req.user._id,
            title,
            content,
            reflection,
            tags,
            location,
            weather: weatherData
        });
        await newEntry.save();
        res.status(201).json(newEntry);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateEntry = async(req, res) => {
    try{
        const updates = req.body;

        const entry = await DiaryEntry.findById(req.params.id);
        if (!entry) {
            return res.status(404).json({ message: "Diary entry not found" });
        }

        if (entry.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Forbidden" });
        }

        const updatedEntry = await DiaryEntry.findByIdAndUpdate(req.params.id, updates, {
            new: true, // Return updated document
            runValidators: true // Ensure validation runs on update
        });

        res.status(200).json(updatedEntry);
        
    }catch(error){
        res.status(400).json({ message: error.message });
    }
};

export const deleteEntry = async(req, res) => {
    try{
        const entry = await DiaryEntry.findById(req.params.id);
        if (!entry) {
            return res.status(404).json({ message: "Diary entry not found" });
        }

        if (entry.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Forbidden" });
        }

        const deletedEntry = await DiaryEntry.findByIdAndDelete(req.params.id);

        res.status(200).json(deletedEntry);
    }catch(error){
        res.status(400).json({ message: error.message });
    }
};