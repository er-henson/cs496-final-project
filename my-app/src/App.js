import React from 'react';
import './App.css';
import UpcomingMeetings from './Pages/UpcomingMeetings'
import NewsSection from './MainPage/NewsSection'
import Footer from './Components/Footer'
function App() {
  return (
    <>
      <div className="container" >
        <div className="row">
            <div className="col-lg-6">
                <NewsSection/>
            </div>
            <div className="col-lg-6">
                <UpcomingMeetings/>
            </div>
          
        </div>
        <Footer/>
      </div>
    </>
  );
}

export default App;
