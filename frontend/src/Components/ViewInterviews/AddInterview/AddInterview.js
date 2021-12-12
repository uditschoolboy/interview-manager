import React, { useState } from 'react'
import './AddInterview.css';

const AddInterview = ({toggleAddComp, interview}) => {

    if(interview === null) {
        interview = {
            title: '',
            startTime: '',
            endTime: '',
            participants: ''
        }
    }
    const [title, setTitle] = useState(interview.title);
    const [startTime, setStartTime] = useState(interview.startTime)
    const [endTime, setEndTime] = useState(interview.endTime)
    const [participants, setParticipants] = useState(interview.participants)


    async function createClicked() {
        if(interview !== null) {
            await fetch(`http://localhost:3000/${interview._id}`, {
                method: 'PATCH',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    title,
                    startTime,
                    endTime,
                    participants
                })
            })
        } else {
            await fetch("http://localhost:3000", {
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    title,
                    startTime,
                    endTime,
                    participants
                })
            })
        }
        toggleAddComp(false, null);

    }

    return (
        <div>
            <form>
                <input type="text" placeholder="Enter Title for Interview" value={title} onChange={e => setTitle(e.target.value)}/>
                <input type="text" placeholder="Start Time" value={startTime} onChange={e => setStartTime(e.target.value)}/>
                <input type="text" placeholder="End Time" value={endTime} onChange={e => setEndTime(e.target.value)}/>
                <input type="text" placeholder="Participants Emails" value={participants} onChange={e => setParticipants(e.target.value)}/>
            </form>
            <button onClick={createClicked}>Create</button>
            <button onClick={() => toggleAddComp(false, null)}>Back</button>
        </div>
    )
}

export default AddInterview
