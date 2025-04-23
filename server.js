// server.js
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send(`
        <form method="POST" action="/submit">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required />
            <button type="submit">Submit</button>
        </form>
    `);
});

app.post('/submit', async (req, res) => {
    try {
        const response = await axios.post('http://localhost:5000/process', req.body);
        if (response.status === 200) {
            res.send(`<h2>Data submitted successfully</h2>`);
        } else {
            res.send(`<h2>Error: ${response.statusText}</h2>`);
        }
    } catch (error) {
        res.send(`<h2>Error: ${error.message}</h2>`);
    }
});

app.listen(PORT, () => {
    console.log(`Frontend running on port ${PORT}`);
});
