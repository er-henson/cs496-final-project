import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import EditMeeting from './EditMeeting';

function PastMeetings()
{
    const navigate = useNavigate();
    const [meetings,setMeetings] = React.useState({});
    
    
    const toEditPage = (meetingID) => {
        navigate('/EditMeeting', {state:{id:meetingID}});
    }
    
    useEffect(() => {
        
        axios.get("http://localhost:4000/pastmeetings")
        .then((response) => {
            setMeetings(response.data);
        })
        
    }, []);
    
    return(
    <div className="d-flex justify-content-center align-items-center">
    <div className="col-12 col-lg-6">
    
    {/*page header*/}
    <div style={{ backgroundColor: '#B59EC1' }}>
      <header className="mt-2 p-4 text-white text-center rounded">
        <h1 style={{ fontWeight: 700, color: '#ffffff' }}> Past meetings </h1>
      </header>
    </div>
    
    
    {/* statement that checks for meetings. If they're there, display them. If not, show that there are 
        no meetings */}
    {meetings && meetings.map ? // the 'if' condition. if 'meetings' and 'meetings.map' are not null,...
        <ul>
        {meetings.map((meeting) => (
            <li className="page_li">
                {/* link to the page to edit a particular meeting. links with the meeting ID so that page can use a GET request.*/}

                
                {/* layout for the meeting itself. */}
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

export default PastMeetings;