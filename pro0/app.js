const express = require('express');
const app = express();
const PORT = 3000

const dbConnection = require('./util/db')
dbConnection();

const userModel = require('./models/UserModel')

app.get('/users', async(req, res) => {
    const users = await userModel.find()

    res.status(200).json({
        message: "Users list",
        data: users,
    })
})

app.listen(PORT, () => {
    console.log(`Express server running at http://127.0.0.1:${PORT}`);
})