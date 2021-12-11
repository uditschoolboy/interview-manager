const express = require('express');
const router = express.Router();
const InterviewModel = require('../models/InterviewModel');

//GET localhost:3000 -> get all interviews
router.get('/', async (req, res) => {
    try {
        const interviews = await InterviewModel.find({});
        res.status(200).json(interviews);
    } catch(err) {
        console.log("couldn't get the interviews");
    }
});

//GET localhost:3000/id -> get interview with given id
router.get('/:id', async (req, res) => {
    const interview = await InterviewModel.findById(req.params.id);
    if(interview) {
        res.status(200).json(interview);
    } else {
        res.status(404).send("couldn't fetch the interview");
    }
});

//POST localhost:3000 -> Create an interview
router.post('/', async (req, res) => {
    console.log(req.body);
    try {
        const interview = new InterviewModel(req.body);
        await interview.save();
        res.status(200).send("Successfully Created the interview");
    } catch(err) {
        console.log(err);
        res.status(400).send("Couldn't create the interview");
    }
});

//PATCH localhost:3000/id -> Edit an interview
router.patch('/:id', async (req, res) => {
    const interview = await InterviewModel.findById(req.params.id);
    if(interview) {
        interview.startTime = req.body.startTime;
        interview.endTime = req.body.endTime;
        interview.title = req.body.title;
        interview.participants = req.body.participants;
        try {
            await interview.save();
            res.status(200).json(interview);
        } catch(err) {
            res.status(400).send("Error in updating the interview");
        }
    } else {
        res.status(404).send("Couldn't find the interview");
    }
});

module.exports = router;