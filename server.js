// Import the Express module - use modern JavaScript ES6 syntax
import express from "express";
// Create an instance of an Express application
const app = express();
// Define the port number the server will listen on
const PORT = 3000;
/**
* Middleware to parse incoming JSON requests
* This allows the server to automatically read and parse JSON data
* from the body of incoming HTTP requests (such as POST requests).
* Without this, req.body would be undefined when handling JSON payloads.
*/
app.use(express.json());
/**
* Route: GET /
* Description: Handles requests to the root URL.
* Response: Sends back a classic "Hello, World!" message.
*/
app.get("/", (req, res) => {
    res.send("Hello, World! Server is up and running.");
});
/**
* Route: GET /greeting
* Description: Handles requests to /greeting
* Response: Sends back a JSON object with a greeting message.
*/
app.get("/greeting", (req, res) => {
    res.json({ message: "Hey there, this is your server responding!" });
});
/**
* Route: POST /messages
* Description: Handles POST requests to /messages
* Request Body: JSON data sent by the client
* Response: - Sends back the same data, wrapped in a JSON object
*/
app.post("/messages", (req, res) => {
    res.json(req.body);
});

/**
* Start the server
* The server listens on the defined PORT and logs a message to
* the console when running.
*/
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});