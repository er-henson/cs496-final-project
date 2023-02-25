import React from 'react';
import axios from 'axios';
//import PasswordField from '../Components/PasswordField';



function CreateAccount() 
{
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [username, setUsername] = React.useState("");
    
    function handleSubmit(e)
    {
        e.preventDefault();
        const baseURL = "http://localhost:4000/saveuser";
        
        let user = 
        {
            email: email,
            password: password,
            username: username
            
        };
        console.log(JSON.stringify(user));
        
        // perform post action, submitting a new user with the JSON from the form
        axios.post(baseURL, user)
        .then((response) => 
        {
            console.log( JSON.stringify(response) );
        })
        .catch((error) =>
        {
            console.log('we\'ve got an error, people!');
            console.log(error);
        });
    }
    
    return (
    /* div to display in the center of the page with a compact header and design */
    <div className="col-12 col-lg-6 offset-lg-3 offset-sm-0" style={{display:'inline-block'}}>
        {/* Page header, says 'Create Account'*/}
        <header className="mt-2 p-4 text-white text-center rounded" style={{backgroundColor: '#FFD92B'}}>
          <h1 style={{fontWeight: 700, color:'#ffffff'}}> Create Account </h1>
        </header>
        
        {/* Form with the email and password */}
        <form className="was-validated" method="post" onSubmit={handleSubmit}>
            {/* Email field */}
            <label className="col-form-label col-12 col-md-3" htmlFor="eml_login"> Email: </label>
            <input 
                value={email}
                onChange={ e => setEmail(e.target.value)}
                className="form-control" type="email" name="email" id="eml_login" required />
            
            {/* Username field */}
            <label className="col-form-label col-12 col-md-3" htmlFor="txt_login"> Name: </label>
            <input 
                value={username}
                onChange={ e => setUsername(e.target.value)}className="form-control" type="text" name="username" id="txt_login" required />
            
            {/* Password field. Have to adjust it to work with states*/}
            <label className="col-form-label col-12 col-md-1" htmlFor="txt_pass"> Password: </label>
              <input 
                value={password}
                onChange={ e => setPassword(e.target.value)}className="form-control" name="password" id="txt_pass" minLength="6" required />
            <br/>
            <button type="submit" className="btn btn-primary" >Submit</button>
        </form>
        
    </div>
    );
}

export default CreateAccount;