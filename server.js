const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const axios = require('axios');
dotenv.config();
const app = express();
const PORT = 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware for parsing JSON and URL encoded form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Handle POST request from frontend (submitting data to Flask)
app.post('/submit', async (req, res) => {
    try {
        // Send the data to Flask backend at port 5000 (assuming Flask is running at http://localhost:5000)
        const response = await axios.post('http://backend:5000/process', req.body);
        if (response.status === 200) {
            res.redirect('/success.html');  // Redirect to success page
        } else {
            res.status(response.status).send('Error processing request');
        }
    } catch (error) {
        res.status(500).send(`Error: ${error.message}`);
    }
});

// Serve an HTML file (index.html) when accessing the root route ("/")
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Listen on all network interfaces (0.0.0.0) to make it accessible externally
app.listen(PORT, '0.0.0.0', () => console.log(`Frontend running on port ${PORT}`
