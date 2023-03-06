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
    <>
    {meetings && meetings.map ? 
        <ul>
        {meetings.map((meeting) => (
            <li>
                <p>{meeting.topic}</p>
                <p>{meeting.speaker}</p>
                <p>{meeting.content}</p>
            </li>
        ))}
        </ul>
        :
        <h1>No meetings found</h1>
    }
    </>
    );
    
}

export default UpcomingMeetings;