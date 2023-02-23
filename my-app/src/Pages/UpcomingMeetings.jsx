import React, { useState } from 'react';
import axios from 'axios';

function UpcomingMeetings() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [type, setType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/post_upcoming', { date, time, type });
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
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
            <label htmlFor="meetingType">Meeting Type</label>
            <select className="form-control" id="meetingType" required defaultValue="">
            <option value="" disabled>Select a meeting type</option>
            <option value="conference">Conference</option>
            <option value="guestSpeaker">Guest Speaker</option>
            <option value="discussion">Discussion</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default UpcomingMeetings;
