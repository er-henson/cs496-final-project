import React from 'react';
import Footer from '../Components/Footer'
function UpcomingMeetings() {
  return (
    <div>
      <nav className="navbar navbar-expand-sm" style={{ backgroundColor: '#4D81A7' }}>
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainMenu">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
      <main className="container my-4">
        <div className="row">
          <div className="col-12 col-lg-6 mb-4">
            {/* left column content */}
          </div>
          <div className="col-12 col-lg-6 mb-4 mx-auto">
            <h2 className="text-center">Upcoming Meetings</h2>
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
      </main>
    </div>
  );
}

export default UpcomingMeetings;