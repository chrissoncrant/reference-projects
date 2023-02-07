const textResponses = require('./models/responses.js');
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5002;

const codeBlocker = require('./utilities/block-code.js');

//Data Access Function:
function getRandomResponse() {
    let randomNumber = Math.floor(Math.random() * textResponses.length);

    return textResponses[randomNumber];
}

app.use(cors());

// This parses any content-types of 'application/json'
app.use(express.json());

app.get('/', (req, res) => {
    console.log('get request received. This shows up in the server\'s console.');

    res.status(200).send({ value: getRandomResponse() });
})

app.post('/', (req, res) => {
    console.log(req.body);

    res.json(req.body);
})

app.get('/wait/:time', (req, res) => {
    const time = req.params.time;

    console.log('loading time', time)

    codeBlocker(time);

    res.status(200).send({ value: getRandomResponse() });
})

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
})