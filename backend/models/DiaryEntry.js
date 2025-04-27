import mongoose from "mongoose";

const diarySchema = new mongoose.Schema({
        user: { // User who owns the entry
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true 
        },
        title: { // Title of the diary entry
            type: String,
            required: true 
        },
        content: { // Main diary content
            type: String,
            required: true
        },
        reflection: { // Optional personal reflection field
            type: String,
            trim: true,
            maxlength: 500
        },
        location: { // User specified location (city, country)
            type: String,
            required: true
        },
        tags: {
            type: [String],
            default: []
        },
        weather: {
            condition: { type: String }, // e.g., "Sunny", "Cloudy"
            temperature: { type: Number }, // Temperature in °F
            location: { type: String } // City, country - user specified
        }
    },
    { timestamps: true } // Automatically adds createdAt & updatedAt
);
/**
* Create the DiaryEntry model based on the schema
*/
const DiaryEntry = mongoose.model("DiaryEntry", diarySchema);
/**
* Export the DiaryEntry Mongoose model for database operations
*
* Usage:
* import DiaryEntry from "../models/DiaryEntry.js";
*
*/
export default DiaryEntry;