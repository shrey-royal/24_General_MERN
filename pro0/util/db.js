const mongoose = require('mongoose')
// mongodb://127.0.0.1:27017/<dbname>
const uri = "mongodb://127.0.0.1:27017/node"

const dbConnection = async() => {
    const connection = await mongoose.connect(uri)
    console.log("Db connected successfully!");
    return connection;
}

module.exports = dbConnection