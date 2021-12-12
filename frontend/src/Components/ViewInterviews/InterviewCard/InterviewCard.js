import React from 'react'
import './InterviewCard.css';

const InterviewCard = ({interview, toggleAddComp, addButton}) => {

    //If the component has to display add button then render that and return
    if(addButton) {
        return (
            <div className="interview-card center-plus" onClick={() => toggleAddComp(true, null, true)}>
                +
            </div>
        )
    }

    //Extract date time from date-time format and split participants string into participant array
    const participantsList = interview.participants.split(' ');
    const [stDate, stTime] = interview.startTime.split('T');
    const [enDate, enTime] = interview.endTime.split('T');

    
    //Random colors are assigned to the interview card component
    const colors = [
        "#6f1d1b", "#bb9457", "#432818", "#99582a", "#002e4e", "#007200", "#4e148c", "#720026", "#086788", "#4b2e39", "#264653", "#6b705c", "#b5838d", "#000000", "#14213d", "#272640", "#4a4e69"
    ];

    return (
        <div 
        className="interview-card"
        onClick={() => toggleAddComp(true, interview, false)}
        style={{color: "white", backgroundColor: colors[Math.floor(Math.random() * 17)]}}>
            <h3>{interview.title}</h3>
            <br/>
            <h5>Starts: {stDate}, {stTime}</h5>
            <h5>Ends: {enDate}, {enTime}</h5>
            <br/>
            <h5>Participants:</h5>
            {participantsList.map((participant, idx) => {
                return <h5 key={idx}>{participant}</h5>
            })}
        </div>
    )
}

export default InterviewCard
