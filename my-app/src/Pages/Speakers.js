import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import EditSpeaker from './EditSpeaker';

function Speakers() {
  const navigate = useNavigate();
  const [speakers, setSpeakers] = useState([]);
  const [user, setUser] = useState(null);

  const toEditPage = (speakerID) => {
    navigate('/EditSpeaker', { state: { id: speakerID } });
  };
  const handleDelete = (speakerID) => {
    axios.delete(`http://localhost:4000/speaker/${speakerID}`)
    .then(() => {
        console.log(speakerID);
        const newspeakers = speakers.filter(speaker => speaker._id !== speakerID);
        setSpeakers(newspeakers);
    })
    .catch()
}

  useEffect(() => {
    axios.get('http://localhost:4000/allspeakers').then((response) => {
      setSpeakers(response.data);
    });
    
    axios.get('http://localhost:4000/getlogged', {withCredentials: true})
    .then((response) => {
        console.log(response.data);
        setUser(response.data);
    })
    .catch((error) => {
        console.log('user not logged in');
    })
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="col-12">
        {/* page header */}
        <div style={{ backgroundColor: '#FFA060' }}>
          <header className="mt-2 p-4 text-white text-center rounded">
            <h1 style={{ fontWeight: 700, color: '#ffffff' }}>Speakers</h1>
          </header>
        </div>
        
        <div className="col-12 col-lg-8">
        {/* statement that checks for speakers. If they're there, display them. If not, show that there are no speakers */}
        {speakers && speakers.length > 0 ? (
          <ul>
            {speakers.map((speaker) => (
              <li className="page_li" key={speaker._id}>
                {/* link to the page to edit a particular speaker. links with the speaker ID so that page can use a GET request.*/}
                {/* {user && user.admin === 1 ? */}
                    <button className="btn" style={{backgroundColor:'#FFA060'}} onClick={() => toEditPage(speaker._id)}>Edit</button>
                    <button className="btn" style={{backgroundColor:'#FFA060'}} onClick={() => handleDelete(speaker._id)}>Delete</button>
                :
                    <></>
                {/* } */}

                {/* layout for the speaker itself. */}
                <p>
                  <span style={{ fontWeight: 700 }}>Name:</span> {speaker.name}
                </p>
                <p>
                  <span style={{ fontWeight: 700 }}>Phone:</span> {speaker.phone}
                </p>
                <p>
                  <span style={{ fontWeight: 700 }}>Email:</span> {speaker.email}
                </p>
                <p>
                  <span style={{ fontWeight: 700 }}>Mailing Address:</span> {speaker.mailing_address}
                </p>
                <p>
                  <span style={{ fontWeight: 700 }}>Specialty:</span> {speaker.specialty}
                </p>
          </li>
        ))}
      </ul>
    ) : (
      <h1>No speakers found</h1>
    )}
    </div>
  </div>
</div>
);
}

export default Speakers;