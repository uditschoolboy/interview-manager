import React from 'react'
import './InterviewCard.css';

const InterviewCard = ({interview, toggleAddComp, addButton}) => {

    if(addButton) {
        return (
            <div className="interview-card center-plus" onClick={() => toggleAddComp(true, null, true)}>
                +
            </div>
        )
    }

    const participantsList = interview.participants.split(' ');
    const colors = [
        "#6f1d1b",
        "#bb9457",
        "#432818",
        "#99582a",
        "#002e4e",
        "#007200",
        "#4e148c",
        "#720026",
        "#086788",
        "#4b2e39"
    ];

    return (
        <div 
        className="interview-card"
        onClick={() => toggleAddComp(true, interview, false)}
        style={{color: "white", backgroundColor: colors[Math.floor(Math.random() * 10)]}}>
            <h3>{interview.title}</h3>
            <br/>
            <h5>Starts: {interview.startTime}</h5>
            <h5>Ends: {interview.endTime}</h5>
            <br/>
            <h5>Participants:</h5>
            {participantsList.map((participant, idx) => {
                return <h5 key={idx}>{participant}</h5>
            })}
        </div>
    )
}

export default InterviewCard
