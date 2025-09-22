const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const examSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    totalMarks: {
        type: Number,
        required: true
    },
    perQuestionMarks: {
        type: Number,
        required: true
    },
    questions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'question'
        }
    ]
});

module.exports = mongoose.model("exam", examSchema);