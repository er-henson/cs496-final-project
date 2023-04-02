import React, {useEffect} from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';

function NewsPage()
{
    const navigate = useNavigate();
    const [meetings,setMeetings] = React.useState([]);
    const [user, setUser] = React.useState(null);
    
    
    
    useEffect(() => {
        
        axios.get("http://localhost:4000/upcomingmeetings")
        .then((response) => {
            setMeetings(response.data);
        })
        
        axios.get('http://localhost:4000/getlogged', {withCredentials: true})
        .then((response) => {
            console.log(response.data);
            setUser(response.data);
        })
        .catch((error) => {
            console.log('user not logged in');
        })
        
    }, []);
    
    return(
    <div className="d-flex justify-content-center align-items-center">
    <div className="col-12">
    
    {/*page header*/}
    <div style={{ backgroundColor: '#84B9F9' }}>
      <header className="mt-2 p-4 text-white text-center rounded">
        <h1 style={{ fontWeight: 700, color: '#ffffff' }}> News and Events </h1>
      </header>
    </div>
    
    </div>
    </div>
);
}
export default NewsPage