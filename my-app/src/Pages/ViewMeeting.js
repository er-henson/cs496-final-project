import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useLocation, useNavigate } from 'react-router-dom';

function ViewMeeting(){
    
    const [meeting, setMeeting] = React.useState();
    const [isLoading, setIsLoading] = React.useState(true);
    
    
    const loc = useLocation();
    const navigate = useNavigate();
    
    let meetingID = loc.state.id;
    
    /*
        get the info for the meeting from the data
    */
    useEffect(() => {
        
        axios.get("http://localhost:4000/meeting/" + meetingID)
        .then((response) => {
            setMeeting(response.data);
            setIsLoading(false);
        })
        .catch((error) => {
            console.log('error in meeting GET request');
            console.log(error);
            setIsLoading(false);
        });
        
    }, []);
    
    
    return(
        <div className='d-flex justify-content-center align-items-center'>
        
            {isLoading ?
                <div>
                    <h1>Loading...</h1>
                </div>
            :
                <div>
                    {meeting ?
                        <div>
                            <h1 style={{fontWeight: 400, textDecoration:'underline'}}>{meeting.topic}</h1>
                            <div className='row'>
                                <div className='col-12 col-lg-6'>
                                     <p><span style={{fontWeight: 700}}>Date:</span> {new Date(Date.parse(meeting.date)).toDateString()}</p>
                                    <p><span style={{fontWeight: 700}}>Time:</span> {new Date(Date.parse(meeting.date)).toLocaleTimeString()}</p>
                                    <p><span style={{fontWeight: 700}}>Location:</span> {meeting.location}</p>
                                    <p><span style={{fontWeight: 700}}>Speaker:</span> {meeting.speaker}</p>
                                </div>
                            
                                <div className='col-12 col-lg-6'>
                                {/* check to see if there is an image included with this meeting. if so, display it. */
                                meeting.img ?
                                <div className='col-lg-2'>
                                    {/* display for the image on the frontend. the main piece is the `meeting.img.data,` which
                                        is the buffer data from the DAO. the incantation `data:image/jpeg;base64,${x}` is how
                                        buffer data is actually interpreted and displayed on the page. i set the image size 
                                        to be really small so that it doesn't take up a huge portion of the page.*/}
                                    <img alt='no image'src={`data:image/jpeg;base64,${meeting.img.data}`} style={{height:400}}/>
                                    
                                    </div>
                                    :
                                    <></>
                                    }
                                </div>
                            </div>
                            
                        </div>
                    :
                        <div>
                            <h1>Meeting not found</h1>
                        </div>
                    }
                </div>
            }
        
        </div>
        
        
    );
    
}

export default ViewMeeting;