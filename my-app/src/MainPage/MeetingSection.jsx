import React from 'react';

function MeetingsSection() {
    return (
      <div className="col-12 col-lg-6" style={{display:'inline-block'}}>
        <div>
          <header className="mt-2 p-4 text-white text-center rounded" style={{backgroundColor: '#84B9F9'}}>
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
  export default MeetingsSection;
  