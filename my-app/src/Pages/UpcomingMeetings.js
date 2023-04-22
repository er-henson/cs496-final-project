import React, {useEffect} from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';

function UpcomingMeetings()
{
    const navigate = useNavigate();
    const [meetings,setMeetings] = React.useState([]);
    const [user, setUser] = React.useState(null);
    
    const toEditPage = (meetingID) => {
        navigate('/EditMeeting', {state:{id:meetingID}});
    }
    
    const toViewPage = (postID) => {
        navigate('/ViewMeeting', {state:{id:postID}});
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
        
        axios.get("http://localhost:4000/upcomingmeetings")
        .then((response) => {
            setMeetings(response.data);
        })
        
        axios.get('http://localhost:4000/getlogged', {withCredentials: true})
        .then((response) => {
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
    <div style={{ backgroundColor: '#B59EC1' }}>
      <header className="mt-2 p-4 text-white text-center rounded">
        <h1 style={{ fontWeight: 700, color: '#ffffff' }}> Upcoming meetings </h1>
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
                        <div className='col-lg-10'>
                            {/* buttons for editing or deleting a meeting.
                                TODO - make it so these only appear to logged-in admins */}
                            {user && user.admin === 1 ?
                            <>
                                <button className="btn" style={{backgroundColor:'#B59EC1'}} onClick={()=>{toEditPage(meeting._id)}}> Edit </button>
                            <span> </span>
                                <button className="btn" style={{backgroundColor:'#B59EC1'}} onClick={()=>{handleDelete(meeting._id)}}> Delete </button>
                            <span> </span>
                            </>
                            :
                            <></>
                            }
                            <button className="btn" style={{backgroundColor:'#B59EC1'}} onClick={()=>{toViewPage(meeting._id)}}> View </button>
                            {/* layout for the meeting itself. */}
                            <p><span style={{fontWeight: 700}}>Date:</span> {new Date(Date.parse(meeting.date)).toDateString()}</p>
                            <p><span style={{fontWeight: 700}}>Time:</span> {new Date(Date.parse(meeting.date)).toLocaleTimeString()}</p>
                            <p><span style={{fontWeight: 700}}>Topic:</span> {meeting.topic}</p>
                            <p><span style={{fontWeight: 700}}>Speaker:</span> {meeting.speaker}</p>
                            <p style={{fontWeight: 700}}>Description:</p>
                            <p className='d-inline-block text-truncate'
                                style={{overflow:'hidden',
                                        maxWidth: 500,
                                        textOverflow:'ellipsis'}}>
                            {meeting.content}
                            </p>
                        </div>
                        {/* check to see if there is an image included with this meeting. if so, display it. */
                        meeting.img ?
                        <div className='col-lg-2'>
                            {/* display for the image on the frontend. the main piece is the `meeting.img.data,` which
                                is the buffer data from the DAO. the incantation `data:image/jpeg;base64,${x}` is how
                                buffer data is actually interpreted and displayed on the page. i set the image size 
                                to be really small so that it doesn't take up a huge portion of the page.*/}
                            <img alt='no image' src={`data:image/jpeg;base64,${meeting.img.data}`} style={{width:150}}/>
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

export default UpcomingMeetings;