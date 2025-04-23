const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const axios = require('axios');
dotenv.config();
const app = express();
const PORT = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for parsing form data and JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Root route (homepage)
app.get('/', (req, res) => {
    // Serve the homepage content, or you can replace this with your HTML file
    res.send('Welcome to the Frontend App!');  // Or serve your HTML file here
});

// POST route for handling form submissions
app.post('/submit', async (req, res) => {
    try {
        // Make a request to the Flask backend
        const response = await axios.post('http://backend:5000/process', req.body);
        
        if (response.status === 200) {
            // On success, redirect to a success page
            res.redirect('/success.html');
        } else {
            res.status(response.status).send('Error processing request');
        }
    } catch (error) {
        // Handle error if backend request fails
        res.status(500).send(`Error: ${error.message}`);
    }
});

// Start the server on the specified port
app.listen(PORT, () => console.log(`Frontend running on port ${PORT}`));
