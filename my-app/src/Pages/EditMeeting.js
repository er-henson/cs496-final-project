import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function EditMeeting()

{
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [speaker, setSpeaker] = useState('');
    const [topic, setTopic] = useState('');
    const [location, setLocation] = useState('');
    const [content, setContent] = useState('');
    
    const loc = useLocation();
    const navigate = useNavigate();
    
    let meetingID = loc.state.id;
    
    /*
        set default values to what is retrieved from the GET request
    */
    useEffect(() => {
        
        axios.get("http://localhost:4000/meeting/" + meetingID)
        .then((response) => {
            setDate(response.data.date);
            setSpeaker(response.data.speaker);
            setTopic(response.data.topic);
            setLocation(response.data.location);
            setContent(response.data.content);
        })
        .catch((error) => {
            console.log('error in meeting GET request');
            console.log(error);
        });
        
    }, []);
    
    /*
        submitting the form should call the update function with the appropriate information
    */
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // send the meeting to the backend
        axios.post('http://localhost:4000/updatemeeting', 
            {_id: meetingID,
             date: date,
             speaker: speaker,
             topic: topic,
             location: location,
             content: content
            }, {withCredentials: true})
        .then((response) =>
        {
            console.log(response.data);
            // redirect to the page with upcoming meetings
            let path = '/UpcomingMeetings';
            navigate(path);
        })
        .catch((error) =>
        {
            console.log(error);
        });
        
    };
    
    
    return(
    <div className="d-flex justify-content-center align-items-center">
      <div className="col-12 col-lg-6">
        {/*page header*/}
        <div style={{ backgroundColor: '#B59EC1' }}>
          <header className="mt-2 p-4 text-white text-center rounded">
            <h1 style={{ fontWeight: 700, color: '#ffffff' }}> Editing Meeting </h1>
          </header>
        </div>
        
        
        <form onSubmit={handleSubmit}>
          {/*field for setting the date*/}
          <div className="form-group">
            <label htmlFor="meetingDate">Date</label>
            <input type="date" className="form-control" id="meetingDate" required value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          {/*field for setting the speaker*/}
          <div className="form-group">
            <label htmlFor="speaker">Speaker</label>
            <input type="text" className="form-control" id="speaker" value={speaker} onChange={(e) => setSpeaker(e.target.value)} />
          </div>
          {/*field for setting the topic*/}
          <div className="form-group">
            <label htmlFor="topic">Topic</label>
            <input type="text" className="form-control" value={topic} id="topic" onChange={(e) => setTopic(e.target.value)} />
          </div>
          {/*field for setting the location*/}
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input type="text" className="form-control" value={location} id="location" onChange={(e) => setLocation(e.target.value)} />
          </div>
          {/*field for setting the description*/}
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea className="form-control" id="description"  value={content} onChange={(e) => setContent(e.target.value)} />
          </div>
          
          <button type="submit" className="btn btn-primary">Submit</button>
          
        </form>
        
        
      </div>
    </div>
    );
}

export default EditMeeting;