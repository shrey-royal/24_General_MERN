const mongoose = require('mongoose')
//mongodb://127.0.0.1:27017/dbname
const uri = "mongodb+srv://user0:user0@cluster0.oozcv3r.mongodb.net/pro1?retryWrites=true&w=majority&appName=Cluster0"

const dbConnection = async() => {
    const connection = await mongoose.connect(uri)
    console.log("DB connected!");
    return connection;
}

module.exports = dbConnection