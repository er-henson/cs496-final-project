import React from 'react';
import '../App.css'
function MeetingSection() {
    return (
      <div className="news-section">
        <div style={{backgroundColor: '#B59EC1'}}>
          <header className="mt-2 p-4 text-white text-center rounded">
            <h1 style={{fontWeight: 700,color:'#ffffff'}}> Upcoming Meetings </h1>
          </header>
        </div>
        <ul>
          <li className="page_li">
            <p>Saturday, 2/11 - 3pm - Conference</p>
          </li>
          <li className="page_li">
            <p>Sunday, 2/12 - 5pm - Guest Speaker</p>
          </li>
          <li className="page_li">
            <p>Monday, 2/13 - 5pm - Discussion</p>
          </li>
        </ul>
      </div>
    );
  }
  export default MeetingSection;
  