import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter,Routes,Route,NavLink} from "react-router-dom";
import axios from 'axios';

import App from './App';
import CreateSpeaker from './Pages/CreateSpeaker';
import UpcomingMeetings from './Pages/UpcomingMeetings';
import EditSpeaker from './Pages/EditSpeaker';

import CreateAccount from './Pages/CreateAccount';
import CreateMeeting from './Pages/CreateMeeting';
import CreateNewsPost from './Pages/CreateNewsPost';
import EditAccount from './Pages/EditAccount';

import Login from './Pages/Login';
import EditMeeting from './Pages/EditMeeting'
import PastMeetings from './Pages/PastMeetings'
import NewsPage from './Pages/NewsPage'
import Speakers from './Pages/Speakers'
import CreationPage from './Pages/CreationPage'
import ViewNewsPost from './Pages/ViewNewsPost'
import ViewMeeting from './Pages/ViewMeeting'

import MeetingSearch from './Pages/MeetingSearch'

import MultiImageUpload from './Components/MultiImageUpload'
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
      <Route exact path="/CreateSpeaker" element={<CreateSpeaker/>}/>
      <Route exact path="/CreateNewsPost" element={<CreateNewsPost/>}/>
      <Route exact path="/EditAccount" element={<EditAccount/>}/>
      <Route exact path="/Speakers" element={<Speakers/>}/>
      <Route exact path="/Login" element={<Login/>}/>
      <Route exact path="/UpcomingMeetings" element={<UpcomingMeetings/>}/>
      <Route exact path="/PastMeetings" element={<PastMeetings/>}/>
      <Route exact path="/NewsPage" element={<NewsPage/>}/>
      <Route exact path="/EditMeeting" element={<EditMeeting/>}/>
      <Route exact path="/EditSpeaker" element={<EditSpeaker/>}/>
      <Route exact path="/CreationPage" element={<CreationPage/>}/>
      <Route exact path="/MeetingSearch" element={<MeetingSearch/>}/>
      <Route exact path="/ViewNewsPost" element={<ViewNewsPost/>}/>
      <Route exact path="/ViewMeeting" element={<ViewMeeting/>}/>
      <Route exact path="/MultiImageUpload" element={<MultiImageUpload imageChange={console.log}/>}/>
    </Routes>
  </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
