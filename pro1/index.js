const express = require('express')
const app = express()
const PORT = 3000
const dbConnection = require('./util/DB')
dbConnection();

const userModel = require('./model/UserModel')

app.get('/users', async(req, res) => {
    const users = await userModel.find()
    res.status(200).json({
        mesaage: "Users List",
        data: users
    })
});

app.listen(PORT, () => {
    console.log(`Server running at http://127.0.0.1:${PORT}`);
    
});