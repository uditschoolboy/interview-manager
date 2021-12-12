const express = require('express');
const router = express.Router();
const InterviewModel = require('../models/InterviewModel');

//Function for sending mail to participants
const mailParticipants = require('../utils/mailParticipants');

//Utility functions for managing participants of interview
const {updateParticipantsTimeTable, validateParticipantsTimeTable, deleteParticipants, validateCount} = require('../utils/participants');

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


        //Check if the count of participants is > 1
        if(!validateCount(interview.participants)) {
            return res.status(400).send({error: "At least 2 participants required for interview"});
        }

        //check if all the participants are free during that duration
        const valid = await validateParticipantsTimeTable(interview.participants, interview.startTime, interview.endTime);
        if(valid) {
            await interview.save();
            updateParticipantsTimeTable(interview.participants, interview.startTime, interview.endTime);
            mailParticipants(interview.participants, interview);
            res.status(200).send("Successfully Created the interview");
        } else {

            //Some participants are busy at that time.
            res.status(400).send({error: "Some participants are busy at this time"});
        }

    } catch(err) {
        console.log(err);
        res.status(400).send("Couldn't create the interview");
    }
});

//DELETE localhost:3000/id -> Delete an interview
router.delete('/:id', async(req, res) => {
    try {
        const interview = await InterviewModel.findByIdAndDelete(req.params.id);

        //Delete the corresponding entries from users collection after deleting the interview
        deleteParticipants(interview.participants, interview.startTime, interview.endTime);
        res.status(200).send("Deleted");
    } catch(err) {
        res.status(400).send("couldn't delete the interview")
    }

});


//PATCH localhost:3000/id -> Edit an interview
router.patch('/:id', async (req, res) => {
    const interview = await InterviewModel.findById(req.params.id);
    if(interview) {
        let oldSt = interview.startTime;
        let oldEn = interview.endTime;
        let oldParticipants = interview.participants;
        interview.startTime = req.body.startTime;
        interview.endTime = req.body.endTime;
        interview.title = req.body.title;
        interview.participants = req.body.participants;

        //Check if participant count is greater than 1
        if(!validateCount(interview.participants)) {
            return res.status(400).send({error: "At least 2 participants required for interview"});
        }
        try {
            deleteParticipants(oldParticipants, oldSt, oldEn);


            //Check if all the participants are free at that time.
            if(!validateParticipantsTimeTable(interview.participants, interview)) {
                return res.status(400).send({error: "Some participants are busy at this time"});
            }
            updateParticipantsTimeTable(interview.participants, interview.startTime, interview.endTime);
            mailParticipants(interview.participants, interview);
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