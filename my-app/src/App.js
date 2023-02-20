import React from 'react';
import './App.css';

function App() {
  return (
<>


<div class="jumbotron p-4 text-center text-white" style={{backgroundColor: '#4D813E'}}>
<h1 style={{fontWeight: 900, color: '#FFFFFF'}}> P.R.S.S.A. Loyola </h1>
</div>

<nav className="navbar navbar-expand-sm" style={{backgroundColor: '#4D81A7'}}>
<div className="container-fluid">
<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainMenu" style={{color: '#FFFFFF'}}>
<span className="bi-grid-1x2-fill"></span>
</button>
<div className="collapse navbar-collapse" id="mainMenu">
<ul className="navbar-nav">
<li className="nav-item">
<a className="fancy_link"> About Us</a>
</li>
<li className="nav-item">
<a className="fancy_link"> National Site </a>
</li>
<li className="nav-item">
<a className="fancy_link"> Past Meetings </a>
</li>
</ul>
</div>
</div>
</nav>
<div className="container" style={{display:'inline-block'}}>
<div className="row">
<div className="col-12 col-lg-6" style={{display:'inline-block'}}>
<header className="mt-2 p-4 text-white text-center rounded" style={{backgroundColor: '#B59EC1'}}>
<h1 style={{fontWeight: 700, color:'#ffffff'}}> Latest News </h1>
</header>
<ul>
<li className="page_li">
<p>Upcoming Seminar</p>
<p>There will be a seminar in three days discussing multiple career opportunities</p>
</li>
<li className="page_li">
<p>Recent Event</p>
<p>Here are the highlights from the last major PRSSA Event</p>
</li>
<li className="page_li">
<p>Guest Appearance This Month!</p>
<p>We have a very special guest appearing to give a talk later this month. Mark your calendars!</p>
</li>
</ul>
</div>
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
