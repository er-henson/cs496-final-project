import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



function Login() 
{
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    
    let navigate = useNavigate();
    
    function handleSubmit(e)
    {
        // stop the page from reloading
        e.preventDefault();
        
        const baseURL = "http://localhost:4000/";
        
        let user = 
        {
            email: email,
            password: password
            
        };
        
        // perform post action, submitting the username and password for verification
        axios.post(baseURL+"dologin", user, {withCredentials:true})
        .then((response) => 
        {
            // test to see if the logged user is actually saved
        axios.get(baseURL + "getlogged", {withCredentials:true} )
            .then((response) => 
            {
                console.log("got logged user successfully:")
                console.log(response.data)
            })
            .catch((error) =>
            {
                console.log("error trying to get logged user");
                console.log(error)
            })
            
            let path = '/Home';
            navigate(path);
            window.location.reload(false);
        })
        .catch((error) =>
        {
            console.log("error trying to log in");
            console.log(error);
            window.alert('Incorrect Login Credentials.');
        });
    }
    
    return (
    /* div to display in the center of the page with a compact header and design */
    <div className="col-12 col-lg-6 offset-lg-3 offset-sm-0" style={{display:'inline-block'}}>
        {/* Page header, says 'Account Login'*/}
        <header className="mt-2 p-4 text-white text-center rounded" style={{backgroundColor: '#FFD92B'}}>
          <h1 style={{fontWeight: 700, color:'#ffffff'}}> Account Login </h1>
        </header>
        
        {/* Form with the email and password */}
        <form className="was-validated" method="post" onSubmit={handleSubmit}>
            {/* Email field */}
            <label className="col-form-label col-12 col-md-3" htmlFor="eml_login"> Email: </label>
            <input 
                value={email}
                onChange={ e => setEmail(e.target.value)}
                className="form-control" type="email" name="email" id="eml_login" required />
            
            {/* Password field. Have to adjust it to work with states*/}
            <label className="col-form-label col-12 col-md-1" htmlFor="txt_pass"> Password: </label>
              <input 
                value={password}
                type="password"
                onChange={ e => setPassword(e.target.value)} className="form-control" name="password" id="txt_pass" minLength="6" required />
            <br/>
            <button type="submit" className="btn btn-primary" >Submit</button>
        </form>
        
    </div>
    );
}

export default Login;