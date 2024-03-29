import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import EditMeeting from './EditMeeting';

function PastMeetings()
{
    const navigate = useNavigate();
    const [meetings,setMeetings] = React.useState({});
    const [user, setUser] = React.useState(null);
    
    
    const toEditPage = (meetingID) => {
        navigate('/EditMeeting', {state:{id:meetingID}});
    }
    
    const handleDelete = (meetingID) => {
      let confirmDelete = window.confirm("Are you sure you want to delete this meeting? This cannot be undone.");
      if(confirmDelete)
      {
          axios.delete(`http://localhost:4000/meeting/${meetingID}`)
          .then(() => {
            // Remove the deleted meeting from the meetings array in the state
            const updatedMeetings = meetings.filter(meeting => meeting._id !== meetingID);
            setMeetings(updatedMeetings);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };
    
    useEffect(() => {
        
        axios.get("http://localhost:4000/pastmeetings")
        .then((response) => {
            setMeetings(response.data);
        })
        
        axios.get('http://localhost:4000/getlogged', {withCredentials: true})
        .then((response) => {
            console.log(response.data);
            setUser(response.data);
        })
        .catch((error) => {
            console.log('user not logged in');
        })
        
    }, []);
    
    return(
    <div className="d-flex justify-content-center align-items-center">
        <div className="col-12">
        
        {/*page header*/}
        <div style={{ backgroundColor: '#B71429' }}>
          <header className="mt-2 p-4 text-white text-center rounded">
            <h1 style={{ fontWeight: 700, color: '#ffffff' }}> Past meetings </h1>
          </header>
        </div>
        
        <div className="d-flex justify-content-center align-items-center">
        {/* statement that checks for meetings. If they're there, display them. If not, show that there are 
            no meetings */}
        {meetings && meetings.map && (meetings.length > 0) ? // the 'if' condition. if 'meetings' and 'meetings.map' are not null,...
            <ul>
            {meetings.map((meeting) => (
            <div>
                <li className="page_li">
                    <div className='row'>
                        <div className='col-lg-11'>
                            {/* link to the page to edit a particular meeting. links with the meeting ID so that page can use a GET request.*/}
                            {user && user.admin === 1 ?
                                <>
                                    <button className="btn" style={{backgroundColor:'#B71429'}} onClick={()=>{toEditPage(meeting._id)}}> Edit </button>
                                <span> </span>
                                    <button className="btn" style={{backgroundColor:'#B71429'}} onClick={()=>{handleDelete(meeting._id)}}> Delete </button>
                                </>
                                :
                                <></>
                            }
                            
                            {/* layout for the meeting itself. */}
                            <p><span style={{fontWeight: 700}}>Topic:</span> {meeting.topic}</p>
                            <p><span style={{fontWeight: 700}}>Speaker:</span> {meeting.speaker}</p>
                            <p style={{fontWeight: 700}}>Description:</p>
                            <p>{meeting.content}</p>
                        </div>
                        
                        {/* check to see if there is an image included with this meeting. if so, display it. */
                            meeting.img ?
                            <div className='col-lg-1'>
                                {/* display for the image on the frontend. the main piece is the `meeting.img.data,` which
                                    is the buffer data from the DAO. the incantation `data:image/jpeg;base64,${x}` is how
                                    buffer data is actually interpreted and displayed on the page. i set the image size 
                                    to be really small so that it doesn't take up a huge portion of the page.*/}
                                <img alt='no image'src={`data:image/jpeg;base64,${meeting.img.data}`} style={{height:150}}/>
                            </div>
                            :
                            <></>
                        }
                    </div>
                </li>
            </div>
            ))}
            </ul>
            :
            <h1>No Meetings Found</h1>
        }
        </div>
        
        </div>
    </div>
    );
    
}

export default PastMeetings;