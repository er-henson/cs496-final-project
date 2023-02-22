import React from 'react';
import '../App.css'

function UpcomingMeetings() {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="col-12 col-lg-6">
        <div style={{ backgroundColor: '#B59EC1' }}>
          <header className="mt-2 p-4 text-white text-center rounded">
            <h1 style={{ fontWeight: 700, color: '#ffffff' }}> Upcoming Meetings </h1>
          </header>
        </div>
        <form>
          <div className="form-group">
            <label htmlFor="meetingDate">Date</label>
            <input type="date" className="form-control" id="meetingDate" required />
          </div>
          <div className="form-group">
            <label htmlFor="meetingTime">Time</label>
            <input type="time" className="form-control" id="meetingTime" required />
          </div>
          <div className="form-group">
            <label htmlFor="meetingType">Meeting Type</label>
            <select className="form-control" id="meetingType" required>
              <option value="" selected disabled>Select a meeting type</option>
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
