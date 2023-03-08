import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { redirect } from 'react-router-dom';

function UpcomingMeetings()
{
    const [meetings,setMeetings] = React.useState({});
    
    useEffect(() => {
        
        axios.get("http://localhost:4000/upcomingmeetings").
        then((response) => {
            setMeetings(response.data);
        })
        
    }, []);
    
    console.log(meetings);
    
    return(
    <div className="d-flex justify-content-center align-items-center">
    <div className="col-12 col-lg-6">
    
    {/*page header*/}
    <div style={{ backgroundColor: '#B59EC1' }}>
      <header className="mt-2 p-4 text-white text-center rounded">
        <h1 style={{ fontWeight: 700, color: '#ffffff' }}> Upcoming meetings </h1>
      </header>
    </div>
    
    
    {/* statement that checks for meetings. If they're there, display them, else show that there are 
        no meetings    */}
    {meetings && meetings.map ? 
        <ul>
        {meetings.map((meeting) => (
            <li className="page_li">
                <p><span style={{fontWeight: 700}}>Topic:</span> {meeting.topic}</p>
                <p><span style={{fontWeight: 700}}>Speaker:</span> {meeting.speaker}</p>
                <p style={{fontWeight: 700}}>Description:</p>
                <p>{meeting.content}</p>
            </li>
        ))}
        </ul>
        :
        <h1>No meetings found</h1>
    }
    
    </div>
    </div>
    );
    
}

export default UpcomingMeetings;