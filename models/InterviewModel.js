const mongoose = require("mongoose");

//Create interview schema and model
const interviewSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    participants: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Interview', interviewSchema);