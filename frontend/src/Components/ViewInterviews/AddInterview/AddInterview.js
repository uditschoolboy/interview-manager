import React, { useEffect, useState } from 'react'
import './AddInterview.css';

const AddInterview = ({toggleAddComp, interview, createNew}) => {

    //If a new interview is to be created assign blank to the fields.
    if(createNew) {
        interview = {
            title: '',
            startTime: '',
            endTime: '',
            participants: ''
        }
    }

    //States for manipulating the inputs in the form
    const [title, setTitle] = useState('');
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [participants, setParticipants] = useState('')

    //Used to initialise the state with the given interview passed in props
    useEffect(() => {
        if(interview) {
            setTitle(interview.title);
            setStartTime(interview.startTime);
            setEndTime(interview.endTime);
            setParticipants(interview.participants);
        }
    }, [])

    //Create interview button clicked and a POST or PATCH request is made depending on createNew
    async function createClicked() {
        let res;
        //If an existing interview is to be edited. a Patch request is made
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
            //Creating a new Interview
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
        if(res.status === 200) {
            alert("Success");
        } else {
            const resJson = await res.json();
            alert(resJson.error);
        }
        toggleAddComp(false, null, true);

    }


    //Delete interview function
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
        <div className="add-interview">
            <form>
                <input type="text" placeholder="Enter Title for Interview" value={title} onChange={e => setTitle(e.target.value)}/>
                <label for="startInput">STARTS</label>
                <input id="startInput" name="startInput" type="datetime-local" value={startTime} onChange={e => setStartTime(e.target.value)}></input>
                <label for="endInput">ENDS</label>
                <input id="endInput" name="endInput" type="datetime-local" value={endTime} onChange={e => setEndTime(e.target.value)}></input>
                <input id="emailInput" type="text" placeholder="Participants Emails. Separate by Space" value={participants} onChange={e => setParticipants(e.target.value)}/>
            </form>
            <button onClick={createClicked}>{createNew ? 'Create' : 'Update'}</button>
            <button onClick={() => toggleAddComp(false, null)}>Back</button>

            {/*Render this button optionally depending on createNew */}
            {!createNew && <button onClick={deleteClicked}>Delete</button>}
        </div>
    )
}

export default AddInterview
