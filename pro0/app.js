const express = require('express');
const app = express();
const PORT = 9000;

app.get('/', (req, res) => {
    res.send("Hello World from Express.js!");
})

app.listen(PORT, () => {
    console.log(`Express server running at http://127.0.0.1:${PORT}`);
})