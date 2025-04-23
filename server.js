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
        <h2>Submit Your Details</h2>
        <form method="POST" action="/submit">
            <label>Name:</label><br>
            <input type="text" name="name" required /><br><br>
            
            <label>Email:</label><br>
            <input type="email" name="email" required /><br><br>
            
            <label>Age:</label><br>
            <input type="number" name="age" required /><br><br>
            
            <button type="submit">Submit</button>
        </form>
    `);
});

app.post('/submit', async (req, res) => {
    try {
        const response = await axios.post('http://localhost:5000/process', req.body);

        if (response.status === 200) {
            res.redirect('/success');
        } else {
            res.send(`<h2>Error: ${response.statusText}</h2>`);
        }
    } catch (error) {
        res.send(`<h2>Error: ${error.message}</h2>`);
    }
});

app.get('/success', (req, res) => {
    res.send(`<h2>Data submitted successfully</h2>`);
});

app.listen(PORT, () => {
    console.log(`Frontend running on port ${PORT}`);
});
