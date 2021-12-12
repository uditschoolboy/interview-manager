const mongoose = require("mongoose");

//Create User schema and model
const userSchema = new mongoose.Schema({
    email: {
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

module.exports = mongoose.model('User', userSchema);