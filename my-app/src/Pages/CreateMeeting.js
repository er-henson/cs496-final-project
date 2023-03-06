import React, { useState } from 'react';
import axios from 'axios';
function setCurrentDate(minute,hour,day,month,year){

  let newDate = new Date()
  newDate.setDay(day);
  newDate.setMonth(month);
  newDate.setFullYear(year);
  newDate.setHours(hour)
  newDate.setMinutes(minute)
  console.log(newDate.get)
}
function printInputted(newDate){


  let day = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  let hours = newDate.getHours()
  let minutes = newDate.getMinutes()
  console.log(`${month<10?`0${month}`:`${month}`}${'/'}${day}${'/'}${year}${" "}${hours}${":"}${minutes}`)
}


function CreateMeeting() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [speaker, setSpeaker] = useState('');
  const [topic, setTopic] = useState('');
  const [location, setLocation] = useState('');
  const [content, setContent] = useState('');
  
  
  const handleSubmit = async (e) => {
    
    e.preventDefault();
    
    axios.post('http://localhost:4000/saveMeeting', {date,time,speaker,topic,location,content})
    .then((response) =>
    {
        console.log(response.data);
    })
    .catch((error) =>
    {
        console.log(error);
    });
    /*
    try {
      console.log({date,time,speaker,topic,location,content})
      //save meetings to backend
      const response = await axios.post('http://localhost:4000/saveMeeting', {date,time,speaker,topic,location,content});
      console.log(response);
    } catch (err) {
      console.error(err);
    }
    */
  };
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="col-12 col-lg-6">
        <div style={{ backgroundColor: '#B59EC1' }}>
          <header className="mt-2 p-4 text-white text-center rounded">
            <h1 style={{ fontWeight: 700, color: '#ffffff' }}> Upcoming Meetings </h1>
          </header>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="meetingDate">Date</label>
            <input type="date" className="form-control" id="meetingDate" required value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="meetingTime">Time</label>
            <input type="time" className="form-control" id="meetingTime" required value={time} onChange={(e) => setTime(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="meetingDate">Speaker</label>
            <input type="text" className="form-control" id="speaker" onChange={(e) => setSpeaker(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="meetingDate">Topic</label>
            <input type="text" className="form-control" id="topic" onChange={(e) => setTopic(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="meetingDate">Location</label>
            <input type="text" className="form-control" id="location" onChange={(e) => setLocation(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="meetingDate">Content</label>
            <input type="text" className="form-control" id="content" onChange={(e) => setContent(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default CreateMeeting;
