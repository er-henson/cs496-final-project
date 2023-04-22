import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useLocation, useNavigate } from 'react-router-dom';

function ViewMeeting(){
    
    const [meeting, setMeeting] = React.useState();
    const [isLoading, setIsLoading] = React.useState(true);
    const [user, setUser] = React.useState(null);
    
    
    const loc = useLocation();
    const navigate = useNavigate();
    let meetingID = loc.state.id;
    
    
    const toEditPage = (meetingID) => {
        navigate('/EditMeeting', {state:{id:meetingID}});
    }
    
    
    const handleDelete = (meetingID) => {
      let confirmDelete = window.confirm("Are you sure you want to delete this meeting? This cannot be undone.");
      if(confirmDelete)
      {
        axios.delete(`http://localhost:4000/meeting/${meetingID}`)
        .then(() => {
            navigate('/Home');
        })
            .catch((error) => {
            console.log(error);
        });
      }
    };
    
    
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
        
        axios.get('http://localhost:4000/getlogged', {withCredentials: true})
        .then((response) => {
            setUser(response.data);
        })
        .catch((error) => {
            console.log('user not logged in');
        })
        
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
                            {user && user.admin === 1 ?
                            <>
                                <button
                                    className="btn"
                                    style={{backgroundColor:'#0F527F'}}
                                    onClick={()=>{toEditPage(meeting._id)}}>
                                Edit
                                </button>
                                
                                <span> </span>
                                
                                <button
                                    className="btn"
                                    style={{backgroundColor:'#0F527F'}}
                                    onClick={()=>{handleDelete(meeting._id)}}>
                                Delete
                                </button>
                                <span> </span>
                            
                            </>
                            :
                            <></>
                            }
                        
                            
                            <div className='row'>
                                <div className='col-12 col-lg-8' style={{marginLeft:'4'}}>
                                     <p><span style={{fontWeight: 700}}>Date:</span> {new Date(Date.parse(meeting.date)).toDateString()}</p>
                                    <p><span style={{fontWeight: 700}}>Time:</span> {new Date(Date.parse(meeting.date)).toLocaleTimeString()}</p>
                                    <p><span style={{fontWeight: 700}}>Location:</span> {meeting.location}</p>
                                    <p><span style={{fontWeight: 700}}>Speaker:</span> {meeting.speaker}</p>
                                    <p style={{fontWeight: 700}}>Description:</p>
                                    <p style={{whiteSpace:'pre-wrap'}}> {meeting.content} </p>
                                </div>
                            
                                <div className='col-12 col-lg-4'>
                                {/* check to see if there is an image included with this meeting. if so, display it. */
                                meeting.img ?
                                <div className='col-lg-2'>
                                    <img alt='no image' src={`data:image/jpeg;base64,${meeting.img.data}`} style={{height:400}}/>
                                    
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