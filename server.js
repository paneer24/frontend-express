const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const axios = require('axios');

// Load environment variables from .env file
dotenv.config();

// Initialize the Express app
const app = express();

// Define the port for the frontend
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Parse incoming requests with URL-encoded data and JSON (using Express built-in methods)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Root route to serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// POST route to handle form submissions
app.post('/submit', async (req, res) => {
    try {
        // Forward the request body to the Flask backend
        const response = await axios.post('http://backend:5000/process', req.body);
        
        if (response.status === 200) {
            // Redirect to success page if the backend process is successful
            res.redirect('/success.html');
        } else {
            res.status(response.status).send('Error processing request');
        }
    } catch (error) {
        // Handle errors during the POST request
        res.status(500).send(`Error: ${error.message}`);
    }
});

// Start the Express server and listen on port 3000 (accessible externally)
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Frontend running on port ${PORT}`);
});
