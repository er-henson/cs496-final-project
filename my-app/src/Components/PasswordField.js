import React from "react";

export default function PasswordField(){
    // change the variable 'visible' to a State
    //let visible = false; normal JS variable
    
    // the parameter in useState is the initial value for the 'visible' variable
    // because 'visible' is a boolean, we use 'false' as the default
    const [visible, setVisible] = React.useState(false);
    
    function toggleVisibility(){
        //visible = !visible;
        // changes the value of 'visible'
        setVisible(!visible);
        console.log(visible);
    }
    // variable changes for password field, but React will not re-render the component
    // only way to change it is to use a State
    return (
    <div className="row mb-2">
        <label className="col-form-label col-12 col-md-1" htmlFor="txt_pass"> Password: </label>
        <div className="col-12 col-md-4">
          <input className="form-control" type={visible?"text":"password"} name="password" id="txt_pass" minLength="6" required />
        </div>
        <div className="col col-form-label">
            <span className={visible?"bi-eye-slash":"bi-eye"} onClick={toggleVisibility}></span>
            <input className="form-check-input" type="checkbox" id="chk_vis" onClick={toggleVisibility} /> 
            <label htmlFor="chk_vis">Hide/Display</label>
        </div>
    </div>
    );
}