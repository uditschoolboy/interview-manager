const UserModel = require('../models/UserModel');

async function validateParticipantsTimeTable(participants, startTime, endTime) {
    const participantsList = participants.split(' ');
    let allDiscrete = true;
    for(let i = 0; i < participantsList.length; i++) {
        const validParticipant = await checkParticipant(participantsList[i], startTime, endTime);
        if(!validParticipant) return false;
    }
    return true;
}
async function checkParticipant(participant, startTime, endTime) {
    const intervals = await UserModel.find({email: participant});
    let allDiscrete = true;
    intervals.forEach(interval => {
        console.log(interval.startTime, interval.endTime);
        if(interval.startTime > endTime || interval.endTime < startTime) {

        } else {
            console.log("made false");
            allDiscrete = false;
        }
    });
    return allDiscrete;
}

function updateParticipantsTimeTable(participants, startTime, endTime) {
    const participantsList = participants.split(' ');
    participantsList.forEach(async (participant) => {
        const entry = new UserModel({
            email: participant,
            startTime,
            endTime
        });
        await entry.save();
    });
}

async function deleteParticipants(participants, startTime, endTime) {
    const participantsList = participants.split(' ');
    participantsList.forEach(async (participant) => {
        await UserModel.deleteOne({
            email: participant,
            startTime,
            endTime
        });
    });
}
module.exports = {validateParticipantsTimeTable, updateParticipantsTimeTable, deleteParticipants};