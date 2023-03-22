import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import EditSpeaker from './EditSpeaker';

function Speakers() {
  const navigate = useNavigate();
  const [speakers, setSpeakers] = useState([]);

  const toEditPage = (speakerID) => {
    navigate('/EditSpeaker', { state: { id: speakerID } });
  };

  useEffect(() => {
    axios.get('http://localhost:4000/allspeakers').then((response) => {
      setSpeakers(response.data);
    });
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="col-12 col-lg-6">
        {/* page header */}
        <div style={{ backgroundColor: '#B59EC1' }}>
          <header className="mt-2 p-4 text-white text-center rounded">
            <h1 style={{ fontWeight: 700, color: '#ffffff' }}>Speakers</h1>
          </header>
        </div>

        {/* statement that checks for speakers. If they're there, display them. If not, show that there are no speakers */}
        {speakers && speakers.length > 0 ? (
          <ul>
            {speakers.map((speaker) => (
              <li className="page_li" key={speaker._id}>
                {/* link to the page to edit a particular speaker. links with the speaker ID so that page can use a GET request.*/}
                <button onClick={() => toEditPage(speaker._id)}>Edit</button>

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
);
}

export default Speakers;