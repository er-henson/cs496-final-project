import React from 'react';
import './App.css';
import MeetingsSection from './MainPage/MeetingSection'
import NewsSection from './MainPage/NewsSection'

function App() {
  return (
    <>
      <div className="container" style={{display:'inline-block'}}>
        <div className="row">
          <NewsSection />
          <MeetingsSection />
        </div>
      </div>
      <div className="jumbotron mt-2 p-4 text-center text-white" style={{backgroundColor: '#4D813E'}}>
        <p style={{color: '#FFFFFF'}}>
          Contact us at: 555-555-5555<br/>
          prssaloy@loyola.edu
        </p>
      </div>
    </>
  );
}

export default App;
