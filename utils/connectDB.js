const mongoose = require('mongoose');

module.exports = async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Database connected".cyan.underline);
    } catch(err) {
        console.log("Couldn't connect to the database".red);
        console.log(err);
    }
}