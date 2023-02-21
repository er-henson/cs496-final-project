import React from 'react';
import './App.css';
import MeetingsSection from './MainPage/MeetingSection'
import NewsSection from './MainPage/NewsSection'

function App() {
  return (
    <>
      <div className="container" >
        <div className="row">
          <NewsSection />
          <MeetingsSection />
        </div>
      </div>
      <div className="jumbotron mt-2 p-4 text-center text-white">
        <p >
          Contact us at: 555-555-5555<br/>
          prssaloy@loyola.edu
        </p>
      </div>
    </>
  );
}

export default App;
