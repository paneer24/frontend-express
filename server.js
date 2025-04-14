const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const axios = require('axios');
dotenv.config();
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/submit', async (req, res) => {
    try {
        const response = await axios.post('http://backend:5000/process', req.body);
        if (response.status === 200) {
            res.redirect('/success.html');
        } else {
            res.status(response.status).send('Error processing request');
        }
    } catch (error) {
        res.status(500).send(`Error: ${error.message}`);
    }
});

app.listen(PORT, () => console.log(`Frontend running on port ${PORT}`));
