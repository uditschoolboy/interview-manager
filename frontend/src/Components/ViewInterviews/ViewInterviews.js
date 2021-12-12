import React, { useEffect, useState } from 'react'
import AddInterview from './AddInterview/AddInterview';
import InterviewCard from './InterviewCard/InterviewCard';
import './ViewInterviews.css';

const ViewInterviews = () => {

    const [interviews, setInterviews] = useState([])
    const [renderAddComp, setRenderAddComp] = useState(false);
    const [createNew, setCreateNew] = useState(true);

    function toggleAddComp(val, interview, newst) {
        setSelectedInterview(interview);
        setRenderAddComp(val);
        setCreateNew(newst);
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
            <AddInterview toggleAddComp = {toggleAddComp} interview={selectedInterview} createNew={createNew}/>
        );
    }

    return (
        <div>
            <button onClick={() => toggleAddComp(true, null, true)}>Add Interview</button>
            {interviews.map((interview, idx) => {
                return (
                    <div onClick={() => toggleAddComp(true, interview, false)} key={idx}>
                        <InterviewCard interview = {interview} key={idx}/>
                    </div>
                );
            })}
        </div>
    )
}

export default ViewInterviews
