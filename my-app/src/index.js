import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter,Routes,Route,NavLink} from "react-router-dom";
import axios from 'axios';

import App from './App';

import UpcomingMeetings from './Pages/UpcomingMeetings';
import EditSpeaker from './Pages/EditSpeaker';
import CreateAccount from './Pages/CreateAccount';
import CreateMeeting from './Pages/CreateMeeting';
import Login from './Pages/Login';
import EditMeeting from './Pages/EditMeeting'
import PastMeetings from './Pages/PastMeetings'
import Speakers from './Pages/Speakers'
import './site_style.css';
import Jumbotron from './MainPage/Jumbotron';
import Navbar from './MainPage/Navbar';
// TODO - figure out a wrapper element for stuff in the BrowserRouter to get the login to work with the navbar
//      could be advantageous to do this since it'd divorce the logged-in user's information from strictly staying
//      in one component




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Jumbotron />
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route exact path="/" element={<App/>}/>
      <Route exact path="/Home" element={<App/>}/>
      <Route exact path="/CreateMeeting" element={<CreateMeeting/>}/>
      <Route exact path="/CreateAccount" element={<CreateAccount/>}/>
      <Route exact path="/Speakers" element={<Speakers/>}/>
      <Route exact path="/Login" element={<Login/>}/>
      <Route exact path="/UpcomingMeetings" element={<UpcomingMeetings/>}/>
      <Route exact path="/PastMeetings" element={<PastMeetings/>}/>
      <Route exact path="/EditMeeting" element={<EditMeeting/>}/>
      <Route exact path="/EditSpeaker" element={<EditSpeaker/>}/>
    </Routes>
  </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
