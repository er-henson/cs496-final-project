import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function EditSpeaker() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [mailingAddress, setMailingAddress] = useState('');
  const [specialty, setSpecialty] = useState('');

  const loc = useLocation();
  const navigate = useNavigate();

  let speakerID = loc.state.id;
  

  /*
    set default values to what is retrieved from the GET request
  */
  useEffect(() => {
    axios
      .get('http://localhost:4000/speaker/' + speakerID)
      .then((response) => {
        setName(response.data.name);
        setPhone(response.data.phone);
        setEmail(response.data.email);
        setMailingAddress(response.data.mailing_address);
        setSpecialty(response.data.specialty);
      })
      .catch((error) => {
        console.log('error in speaker GET request');
        console.log(error);
      });
  }, []);

  /*
    submitting the form should call the update function with the appropriate information
  */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // send the speaker to the backend
    axios
      .post('http://localhost:4000/EditSpeaker', {
        _id: speakerID,
        name: name,
        phone: phone,
        email: email,
        mailing_address: mailingAddress,
        specialty: specialty,
      })
      .then((response) => {
        console.log(response.data);
        // redirect to the page with the list of speakers
        let path = '/allspeakers';
        navigate(path);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="col-12 col-lg-6">
        {/*page header*/}
        <div style={{ backgroundColor: '#B59EC1' }}>
          <header className="mt-2 p-4 text-white text-center rounded">
            <h1 style={{ fontWeight: 700, color: '#ffffff' }}>Editing Speaker</h1>
          </header>
        </div>

        <form onSubmit={handleSubmit}>
          {/*field for setting the name*/}
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control" id="name" required value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          {/*field for setting the phone*/}
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input type="text" className="form-control" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          {/*field for setting the email*/}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          {/*field for setting the mailing address*/}
          <div className="form-group">
            <label htmlFor="mailingAddress">Mailing Address</label>
            <textarea className="form-control" id="mailingAddress" value={mailingAddress} onChange={(e) => setMailingAddress(e.target.value)} />
</div>
{/*field for setting the specialty*/}
<div className="form-group">
<label htmlFor="specialty">Specialty</label>
<input type="text" className="form-control" id="specialty" value={specialty} onChange={(e) => setSpecialty(e.target.value)} />
</div>
      {/*submit button*/}
      <button type="submit" className="btn btn-primary">Save</button>
    </form>
  </div>
</div>
);
}

export default EditSpeaker;





