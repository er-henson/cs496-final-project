import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ImageUpload from '../Components/ImageUpload';

/*
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
*/

function CreateMeeting() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [speaker, setSpeaker] = useState('');
  const [topic, setTopic] = useState('');
  const [location, setLocation] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState();
  
  let navigate = useNavigate();
  
  useEffect(() => {console.log('image on meeting create page is: ', image)}, [image]);
  
  const handleSubmit = async (e) => {
    // stop the page from reloading
    e.preventDefault();
    
    //let newMeeting = new FormData();
    //console.log(date + " " + time);
    
    
    let combinedDateTime = new Date(Date.parse(date + " " + time))
    
    let newMeeting = new FormData();
    newMeeting.append('date', combinedDateTime);
    newMeeting.append('speaker', speaker);
    newMeeting.append('topic', topic);
    newMeeting.append('location', location);
    newMeeting.append('content', content);
    newMeeting.append('meetingImage', image);
    
    console.log(newMeeting);
    
    
    // send the meeting to the backend
    axios.post('http://localhost:4000/savemeeting', newMeeting, {withValidation: true, withCredentials: true})
    .then((response) =>
    {
        console.log(response.data);
        // redirect to the page with upcoming meetings
        let path = '/Home';
        navigate(path);
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
        {/*page header*/}
        <div style={{ backgroundColor: '#B59EC1' }}>
          <header className="mt-2 p-4 text-white text-center rounded">
            <h1 style={{ fontWeight: 700, color: '#ffffff' }}> Creating Meeting </h1>
          </header>
        </div>
        
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          {/*field for setting the date*/}
          <div className="form-group">
            <label htmlFor="meetingDate">Date</label>
            <input type="date" className="form-control" id="meetingDate" required value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          {/*field for setting the time*/}
          <div className="form-group">
            <label htmlFor="meetingTime">Time</label>
            <input type="time" className="form-control" id="meetingTime" required value={time} onChange={(e) => setTime(e.target.value)} />
          </div>
          {/*field for setting the speaker*/}
          <div className="form-group">
            <label htmlFor="speaker">Speaker</label>
            <input type="text" className="form-control" id="speaker" onChange={(e) => setSpeaker(e.target.value)} />
          </div>
          {/*field for setting the topic*/}
          <div className="form-group">
            <label htmlFor="topic">Topic</label>
            <input type="text" className="form-control" id="topic" onChange={(e) => setTopic(e.target.value)} />
          </div>
          {/*field for setting the location*/}
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input type="text" className="form-control" id="location" onChange={(e) => setLocation(e.target.value)} />
          </div>
          {/*field for setting the description*/}
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea className="form-control" id="description" onChange={(e) => setContent(e.target.value)} />
          </div>
          
          {/*field for sending an image*/}
          <div className ="form-group">
          <ImageUpload imageChange={setImage}/>
          </div>
          
          <button type="submit" className="btn btn-primary">Submit</button>
          
        </form>
      </div>
    </div>
  );
}

export default CreateMeeting;
