import React, { useEffect, useState } from 'react'
import './AddInterview.css';

const AddInterview = ({toggleAddComp, interview, createNew}) => {

    if(createNew) {
        interview = {
            title: '',
            startTime: '',
            endTime: '',
            participants: ''
        }
    }
    const [title, setTitle] = useState('');
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [participants, setParticipants] = useState('')
    useEffect(() => {
        if(interview) {
            setTitle(interview.title);
            setStartTime(interview.startTime);
            setEndTime(interview.endTime);
            setParticipants(interview.participants);
        }
    }, [])


    async function createClicked() {
        let res;
        if(!createNew) {
            res = await fetch(`http://localhost:3000/${interview._id}`, {
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
            res = await fetch("http://localhost:3000", {
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
        if(res && res.status === 200) {
            alert("Success");
        } else {
            alert("Couldn't create the interview");
        }
        toggleAddComp(false, null);

    }

    async function deleteClicked() {
        try {
            const res = await fetch(`http://localhost:3000/${interview._id}`, {
                method: 'DELETE'
            })
            if(res.status === 200) {
                alert("Successfully deleted the interview");
            } else {
                alert("Couldn't delete");    
            }
        } catch(err) {
            alert("Couldn't delete");
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
            <button onClick={createClicked}>{createNew ? 'Create' : 'Update'}</button>
            <button onClick={() => toggleAddComp(false, null)}>Back</button>
            {createNew && <button onClick={deleteClicked}>Delete</button>}
        </div>
    )
}

export default AddInterview
