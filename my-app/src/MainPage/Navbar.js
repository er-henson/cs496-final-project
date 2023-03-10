import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import '../App.css'
function Navbar()
{
    const [user, setUser] = React.useState({});
    
    /*
        changing the navbar when a user logs in.
    */
    useEffect(() => {
        console.log('Navbar calling useEffect now.');
        axios.get('http://localhost:4000/getlogged')
        .then((response) => {
            console.log(response.data);
            setUser(response.data);
        })
    });
    
    /*
        function to log the user out
    */
    function logout()
    {
        axios.get('http://localhost:4000/logout')
        .then((response) => {
            setUser(response.data);
        })
    }
    
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
                
                {/*check if the user is logged in. if they are, then change these buttons to 'logout'*/}
                {user ? 
                
                    <li className="nav-item">
                        <button onClick={logout} className="fancy_link">Logout</button>
                    </li>
                
                : // if the user is not logged in, render the 'create account' and 'login' buttons
                <>
                    <li className="nav-item">
                        <NavLink to="/CreateAccount" className="fancy_link">Register</NavLink>
                    </li>
                    
                    <li className="nav-item">
                        <NavLink to="/Login" className="fancy_link">Login</NavLink>
                    </li>
                </>
                }
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