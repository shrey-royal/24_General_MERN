const express = require('express');
const app = express();
const PORT = 3000
const dbConnection = require('./util/db')
dbConnection();

app.listen(PORT, () => {
    console.log(`Express server running at http://127.0.0.1:${PORT}`);
})