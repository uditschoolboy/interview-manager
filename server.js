const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const colors = require('colors');
const InterviewRoutes = require('./routes/InterviewRoutes');
const connectDB = require('./utils/connectDB');
connectDB();


//Parse Json in request body
app.use(express.json());

//Use Interview routes
app.use(InterviewRoutes);


const PORTNO = process.env.PORT_NO || 5000;
app.listen(PORTNO, () => {
    console.log(`Server running on PORT: ${PORTNO}`.yellow.bold);
})