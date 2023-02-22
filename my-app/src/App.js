import React from 'react';
import './App.css';
import MeetingSection from './MainPage/MeetingSection'
import NewsSection from './MainPage/NewsSection'
import Footer from './Components/Footer'
function App() {
  return (
    <>
      <div className="container" >
        <div className="row">
          <NewsSection />
          <MeetingSection />
        </div>
        <Footer/>
      </div>
    </>
  );
}

export default App;
