import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter,Routes,Route,NavLink} from "react-router-dom";

import App from './App';

import UpcomingMeetings from './Pages/UpcomingMeetings';
import CreateAccount from './Pages/CreateAccount';
import CreateMeeting from './Pages/CreateMeeting';
import Login from './Pages/Login';

import './site_style.css';
import Jumbotron from './MainPage/Jumbotron';
import Navbar from './MainPage/Navbar';

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
      <Route exact path="/Login" element={<Login/>}/>
      <Route exact path="/UpcomingMeetings" element={<UpcomingMeetings/>}/>
    </Routes>
  </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
