import React, { useEffect, useState } from 'react'
import AddInterview from './AddInterview/AddInterview';
import InterviewCard from './InterviewCard/InterviewCard';
import './ViewInterviews.css';

const ViewInterviews = () => {

    const [interviews, setInterviews] = useState([])
    const [renderAddComp, setRenderAddComp] = useState(false);
    function toggleAddComp(val, interview) {
        setSelectedInterview(interview);
        setRenderAddComp(val);
    }
    const [selectedInterview, setSelectedInterview] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3000', {
            method: 'GET',    
        })
        .then(res => res.json())
        .then(resJson => setInterviews(resJson))
        .catch(err => console.log("Couldn't get the interviews"))
    }, [renderAddComp]);

    if(renderAddComp) {
        return (
            <AddInterview toggleAddComp = {toggleAddComp} interview={selectedInterview}/>
        );
    }

    return (
        <div>
            <button onClick={() => toggleAddComp(true, null)}>Add Interview</button>
            {interviews.map((interview, idx) => {
                return (
                    <div onClick={() => toggleAddComp(true, interview)} key={idx}>
                        <InterviewCard interview = {interview} key={idx}/>
                    </div>
                );
            })}
        </div>
    )
}

export default ViewInterviews
