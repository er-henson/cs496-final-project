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
                    <NavLink to="/" className="fancy_link"> About Us</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/" className="fancy_link"> National Site </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/" className="fancy_link"> Past Meetings </NavLink>
                </li>
            </ul>
        </div>
    </div>
    </nav>
    );
};

export default Navbar;