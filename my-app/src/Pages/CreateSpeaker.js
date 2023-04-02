import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateSpeaker() {
const [name, setName] = useState('');
const [phone, setPhone] = useState('');
const [email, setEmail] = useState('');
const [mailingAddress, setMailingAddress] = useState('');
const [specialty, setSpecialty] = useState('');

let navigate = useNavigate();

const handleSubmit = async (e) => {
    e.preventDefault();
    
    axios.post('http://localhost:4000/savespeaker', {name, phone, email, mailing_address: mailingAddress, specialty})
    .then((response) =>
    {
        console.log(response.data);
        let path = '/speakers';
        navigate(path);
    })
    .catch((error) =>
    {
        console.log(error);
    });
};

return (
<div className="d-flex justify-content-center align-items-center">
    <div className="col-12 col-lg-6">
        <div style={{ backgroundColor: '#B59EC1' }}>
            <header className="mt-2 p-4 text-white text-center rounded">
                <h1 style={{ fontWeight: 700, color: '#ffffff' }}> Creating Speaker </h1>
            </header>
        </div>
        <form onSubmit={handleSubmit}>
          {/*field for setting the speaker's name*/}
          <div className="form-group">
            <label htmlFor="speakerName">Name</label>
            <input type="text" className="form-control" id="speakerName" required value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          {/*field for setting the speaker's phone number*/}
          <div className="form-group">
            <label htmlFor="speakerPhone">Phone</label>
            <input type="tel" className="form-control" id="speakerPhone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          {/*field for setting the speaker's email*/}
          <div className="form-group">
            <label htmlFor="speakerEmail">Email</label>
            <input type="email" className="form-control" id="speakerEmail" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          {/*field for setting the speaker's mailing address*/}
          <div className="form-group">
            <label htmlFor="speakerMailingAddress">Mailing Address</label>
            <input type="text" className="form-control" id="speakerMailingAddress" value={mailingAddress} onChange={(e) => setMailingAddress(e.target.value)} />
          </div>
          {/*field for setting the speaker's specialty*/}
          <div className="form-group">
            <label htmlFor="speakerSpecialty">Specialty</label>
            <input type="text" className="form-control" id="speakerSpecialty" required value={specialty} onChange={(e) => setSpecialty(e.target.value)} />
          </div>
          
          <button type="submit" className="btn btn-primary">Submit</button>
          
        </form>
    </div>
</div>
);
}

export default CreateSpeaker;