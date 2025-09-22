const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    name: String,
    degree: [
        {
            name: String,
            passingYear: Number
        }
    ],
    status: {
        type: String,
        enum: ['active', 'not active', 'pending']
    }
});

module.exports = mongoose.model('employee', employeeSchema)