import React, {useEffect} from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';

function UpcomingMeetings()
{
    const navigate = useNavigate();
    const [meetings,setMeetings] = React.useState({});
    
    
    const toEditPage = (meetingID) => {
        navigate('/EditMeeting', {state:{id:meetingID}});
    }
    const handleDelete = (meetingID) => {
      axios.delete(`http://localhost:4000/meeting/${meetingID}`)
        .then(() => {
          // Remove the deleted meeting from the meetings array in the state
          const updatedMeetings = meetings.filter(meeting => meeting._id !== meetingID);
          setMeetings(updatedMeetings);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    
    useEffect(() => {
        
        axios.get("http://localhost:4000/upcomingmeetings")
        .then((response) => {
            setMeetings(response.data);
        })
        
    }, []);
    
    return(
    <div className="d-flex justify-content-center align-items-center">
    <div className="col-12 col-lg-8">
    
    {/*page header*/}
    <div style={{ backgroundColor: '#B59EC1' }}>
      <header className="mt-2 p-4 text-white text-center rounded">
        <h1 style={{ fontWeight: 700, color: '#ffffff' }}> Upcoming meetings </h1>
      </header>
    </div>
    
    
    {/* statement that checks for meetings. If they're there, display them. If not, show that there are 
        no meetings */}
    {meetings && meetings.map ? // the 'if' condition. if 'meetings' and 'meetings.map' are not null,...
        <ul>
        {meetings.map((meeting) => (
            <div>
                <li className="page_li">
                    <div className='row'>
                        <div className='col-lg-11'>
                            {/* buttons for editing or deleting a meeting.
                                TODO - make it so these only appear to logged-in admins */}
                            <button onClick={()=>{toEditPage(meeting._id)}}> Edit </button>
                            <button onClick={()=>{handleDelete(meeting._id)}}> Delete </button>
                            {/* layout for the meeting itself. */}
                            <p><span style={{fontWeight: 700}}>Date:</span> {new Date(Date.parse(meeting.date)).toDateString()}</p>
                            <p><span style={{fontWeight: 700}}>Topic:</span> {meeting.topic}</p>
                            <p><span style={{fontWeight: 700}}>Speaker:</span> {meeting.speaker}</p>
                            <p style={{fontWeight: 700}}>Description:</p>
                            <p>{meeting.content}</p>
                        </div>
                        <div className='col-lg-1'>
                            {/* display for the image on the frontend. the main piece is the `meeting.img.data,` which
                                is the buffer data from the DAO. the incantation `data:image/jpeg;base64,${x}` is how
                                buffer data is actually interpreted and displayed on the page. i set the image size 
                                to be really small so that it doesn't take up a huge portion of the page.*/}
                            <img alt='no image'src={`data:image/jpeg;base64,${meeting.img.data}`} style={{height:150}}/>
                        </div>
                    </div>
                </li>
            </div>
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