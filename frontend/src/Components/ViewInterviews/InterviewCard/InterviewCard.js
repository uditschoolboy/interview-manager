import React from 'react'
import './InterviewCard.css';

const InterviewCard = ({interview}) => {
    return (
        <div>
            <h3>{interview.title}</h3>
            <h5>Starts: {interview.startTime}</h5>
            <h5>Ends: {interview.endTime}</h5>
            <h5>{interview.participants}</h5>
        </div>
    )
}

export default InterviewCard
