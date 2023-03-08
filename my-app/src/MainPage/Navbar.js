import React from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css'
function Navbar()
{
    return (
    <nav className="navbar navbar-expand-sm">
    <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainMenu">
        <span className="bi-grid-1x2-fill"></span>
        </button>
        <div className="collapse navbar-collapse" id="mainMenu">
        
            <ul className="navbar-nav">
                <li className="nav-item">
                    <NavLink to="/" className="fancy_link">Home</NavLink>
                </li>
                
                <li className="nav-item">
                    <NavLink to="/CreateAccount" className="fancy_link">Register</NavLink>
                </li>
                
                <li className="nav-item">
                    <NavLink to="/Login" className="fancy_link">Login</NavLink>
                </li>
                
                <li className="nav-item">
                    <NavLink to="/UpcomingMeetings" className="fancy_link">Upcoming Meetings</NavLink>
                </li>
            </ul>
            
        </div>
    </div>
    </nav>
    );
};

export default Navbar;