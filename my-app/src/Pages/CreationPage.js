import React from 'react';
import { NavLink } from 'react-router-dom';

function CreationPage(){
    
    
    return (
        <div>
            <h1>huh!?</h1>
            
            <NavLink to="/CreateMeeting" className="btn" style={{backgroundColor:'#9975B2'}}>
                Create New Meeting
            </NavLink>
            
            <br/>
            
            <NavLink to="/CreateSpeaker" className="btn" style={{backgroundColor:'#FFA060'}}>
                Add Guest Speaker
            </NavLink>
            
            <br/>
            
            <NavLink to="/CreateNewsPost" className="btn" style={{backgroundColor:'#84B9F9'}}>
                Create News Post
            </NavLink>
        </div>
    );
}

export default CreationPage