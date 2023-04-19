import React from 'react';
import './App.css';
import UpcomingMeetings from './Pages/UpcomingMeetings'
import NewsPage from './Pages/NewsPage'
import Footer from './Components/Footer'
function App() {
  return (
    <>
      <div className="container" >
        <div className="row">
            <div className="col-lg-6">
                <NewsPage/>
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
