import React, {useEffect} from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';

function MeetingSearch(){
    const [meetings,setMeetings] = React.useState();
    const [query, setQuery] = React.useState('');
    
    const navigate = useNavigate();
    
    const toViewPage = (postID) => {
        navigate('/ViewMeeting', {state:{id:postID}});
    }
    
    const handleSearch = (e) => {
        e.preventDefault();
        
        axios.post('http://localhost:4000/searchmeetings', {search: query})
        .then((response)=>{
            let currMeetings = response.data;
            console.log(response.data);
            if(currMeetings)
            {
                setMeetings(response.data);
            }
            else
            {
                setMeetings([]);
            }
        })
        .catch((error)=>{
            console.log(error)
            setMeetings([]);
        })
    }
    
    return(
        <div className="d-flex justify-content-center align-items-center">
        <div className='col-12'>
            <div style={{ backgroundColor: '#0F527F' }}>
              <header className="mt-2 p-4 text-white text-center rounded">
                <h1 style={{ fontWeight: 700, color: '#ffffff' }}> Search Meetings </h1>
              </header>
            </div>
    

            <div className='d-flex justify-content-center align-items-center'>
                <div className='col-lg-4'>
                <form onSubmit={handleSearch}>
                    <div className='d-flex flex-row'>
                        <div className='p-2'>
                        <label htmlFor='searchQuery'>Search: </label>
                        </div>
                        <div className='p-2'>
                        <input type='text' className='form-control' id='searchQuery' value={query} onChange={(e)=>setQuery(e.target.value)} />
                        </div>
                        <div className='p-2'>
                        <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </form>
                </div>
            </div>
            
            <div className='d-flex justify-content-center align-items-center'>
            <div className='col-12 col-lg-8'>
            {meetings && meetings.map && (meetings.length > 0) ?
                <ul>
                {meetings.map((meeting) => (
                    
                    <li className='page_li'>
                        <div className='row'>
                            <div className='col-lg-10'>
                                <button className="btn" style={{backgroundColor:'#0F527F'}} onClick={()=>{toViewPage(meeting._id)}}> View </button>

                                {/* layout for the meeting itself. */}
                                <p><span style={{fontWeight: 700}}>Date:</span> {new Date(Date.parse(meeting.date)).toDateString()}</p>
                                <p><span style={{fontWeight: 700}}>Time:</span> {new Date(Date.parse(meeting.date)).toLocaleTimeString()}</p>
                                <p><span style={{fontWeight: 700}}>Topic:</span> {meeting.topic}</p>
                                <p><span style={{fontWeight: 700}}>Speaker:</span> {meeting.speaker}</p>
                                <p style={{fontWeight: 700}}>Description:</p>
                                <p>{meeting.content}</p>
                            </div>
                            {/* check to see if there is an image included with this meeting. if so, display it. */
                                meeting.img && meeting.img.data ?
                                <div className='col-lg-2'>
                                    <img alt='no image' src={`data:image/jpeg;base64,${meeting.img.data}`} style={{width:150}}/>
                                </div>
                                :
                                <></>
                            }
                        </div>
                    </li>
                    
                ))}
                </ul>
            :
                <>
                {meetings && meetings.map && (meetings.length === 0) ?
                    <div className='d-flex justify-content-center align-items-center'>
                    <h1>No Meetings</h1>
                    </div>
                :
                    <div className='d-flex justify-content-center align-items-center'>
                    <h1>Search for Meetings</h1>
                    </div>
                }
                </>
            }
            </div>
            </div>

            
        </div>
        </div>
    );
}

export default MeetingSearch;