import React from 'react';
import { NavLink } from 'react-router-dom';

function CreationPage(){
    
    
    return (
        <div className='d-flex justify-content-center'>
            <div className='col-lg-4'>
                <div className='row'>
                <h1 className='text-center'>Options</h1>
                </div>
            
                <div className='row'>
                    <NavLink to="/CreateMeeting" className="btn" style={{backgroundColor:'#9975B2'}}>
                        Create New Meeting
                    </NavLink>
                </div>
                
                <br/>
                
                <div className='row'>
                    <NavLink to="/CreateSpeaker" className="btn" style={{backgroundColor:'#FFA060'}}>
                        Add Guest Speaker
                    </NavLink>
                </div>
                
                <br/>
                
                <div className='row'>
                    <NavLink to="/CreateNewsPost" className="btn" style={{backgroundColor:'#84B9F9'}}>
                        Create News Post
                    </NavLink>
                </div>
            </div>
            
        </div>
    );
}

export default CreationPage