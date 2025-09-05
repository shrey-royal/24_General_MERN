const express = require('express');
const app = express();
const PORT = 3000

app.get("/", (req, res) => {
    res.send("Hello, World!")
})

app.get("/health", (req, res) => {
    res.send("{\"Status\": \"healthy\"}")
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})