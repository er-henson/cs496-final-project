import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function EditAccount() {
  // Define state variables for username, email, and password
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Retrieve the user ID from the URL location and initialize navigation
  const loc = useLocation();
  const navigate = useNavigate();
  const userId = loc.state.id;

  // Make a GET request to retrieve user information from the backend
  useEffect(() => {
    axios
      .get('http://localhost:4000/user/' + userId)
      .then((response) => {
        setUsername(response.data.username);
        setEmail(response.data.email);
      })
      .catch((error) => {
        console.log('error in user GET request');
        console.log(error);
      });
  }, []);

  // Define a function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send the user information to the backend to update their account
    axios
      .post('http://localhost:4000/updateuser', {
        _id: userId,
        username: username,
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        // Redirect the user to the page with their updated account details
        let path = '/UserDetails';
        navigate(path);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Render the form for editing account information
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="col-12 col-lg-6">
        {/* Page header */}
        <div style={{ backgroundColor: '#B59EC1' }}>
          <header className="mt-2 p-4 text-white text-center rounded">
            <h1 style={{ fontWeight: 700, color: '#ffffff' }}> Edit Account </h1>
          </header>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Field for setting the username */}
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Field for setting the email */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Field for setting the password */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Submit button */}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditAccount;
