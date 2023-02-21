import React from 'react';
import axios from 'axios';
import PasswordField from '../Components/PasswordField';

const baseURL = "http://localhost:4000/newuser"

function CreateAccount() 
{
    //const [username, setUsername] = React.useState(null);
    //const [password, setPassword] = React.useState(null);
    
    /*
    function createNewUser()
    {
        axios.post(baseURL, 
        {
            username: ,
            password: ,
        })
        .then((response) => 
        {
            
        });
    }
    */
    
    function handleSubmit(e)
    {
        console.log("Form submitted.")
        // prevents browser from reloading the page
        e.preventDefault();
        
        const form = e.target
        const formData = new FormData(form);
        
        const formJson = Object.fromEntries(formData.entries());
        
        console.log(formJson);
        
        // perform post action, submitting a new user
        axios.post(baseURL, formJson)
        .then((response) => 
        {
            console.log( JSON.stringify(response.data) );
        })
        .catch((error) =>
        {
            console.log(error);
        });
    }
    
    return (
    <div className="col-12 col-lg-6 offset-lg-3 offset-sm-0" style={{display:'inline-block'}}>
        <header className="mt-2 p-4 text-white text-center rounded" style={{backgroundColor: '#FFD92B'}}>
          <h1 style={{fontWeight: 700, color:'#ffffff'}}> Email: </h1>
        </header>
        
        <form className="was-validated" method="post" onSubmit={handleSubmit}>
            <label className="col-form-label col-12 col-md-1" htmlFor="txt_login"> Login: </label>
            <input className="form-control" type="email" name="username" id="txt_login" required />
            
            <PasswordField />
            <button type="submit">Submit</button>
            
        </form>
        
    </div>
    );
}

export default CreateAccount;