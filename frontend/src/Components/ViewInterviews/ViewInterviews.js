import React, { useEffect, useState } from 'react'
import AddInterview from './AddInterview/AddInterview';
import InterviewCard from './InterviewCard/InterviewCard';
import './ViewInterviews.css';

const ViewInterviews = () => {

    //State for interviews fetched through the api call to server
    const [interviews, setInterviews] = useState([])

    //State for rendering addInterviewComponent
    const [renderAddComp, setRenderAddComp] = useState(false);

    const [createNew, setCreateNew] = useState(true);

    //Function for toggling display of add component to add or edit an interview.
    function toggleAddComp(val, interview, newst) {
        setSelectedInterview(interview);
        setRenderAddComp(val);
        setCreateNew(newst);
    }

    //State for displaying a single interview in the add component
    const [selectedInterview, setSelectedInterview] = useState(null);

    //To fetch all the interviews from the api
    useEffect(() => {
        fetch('https://interview-manager-heroku.herokuapp.com', {
            method: 'GET',    
        })
        .then(res => res.json())
        .then(resJson => setInterviews(resJson))
        .catch(err => console.log("Couldn't get the interviews"))
    }, [renderAddComp]);

    //to create a new interview this component is rendered
    if(renderAddComp) {
        return (
            <AddInterview toggleAddComp = {toggleAddComp} interview={selectedInterview} createNew={createNew}/>
        );
    }

    return (
        <div className="interviews-container">

            
            {/*Show all the interviews in InterviewCard component
            The first interview Card component is used as a reusable add button*/}


            <InterviewCard addButton={true} toggleAddComp={toggleAddComp}/>
            {interviews.map((interview, idx) => {
                return (
                    <InterviewCard interview = {interview} addButton={false} key={idx} toggleAddComp={toggleAddComp}/>
                );
            })}
        </div>
    )
}

export default ViewInterviews
