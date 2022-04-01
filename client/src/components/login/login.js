import React, { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './login.scss';
import axiosService from "../../helpers/axios";

export default function Login(props) {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [usernameLogin, setUsernameLogin] = useState('')
  const [passwordLogin, setPasswordLogin] = useState('')

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const config = {
      url: 'http://localhost:3002/users/login',
      method: 'POST',
      data: {
        username: usernameLogin, password: passwordLogin
      },
    };
    axios(config)
      .then((resp) => {
        setIsSubmitted(true);
        localStorage.setItem("User", JSON.stringify(resp.data));
        navigate('/home')
      })
      .catch(function (error) {
        console.log("Error: ", error);
        setErrorMessages({ name: "pass", message: "Invalid credentials" });
      });
    };
    
    const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );
  async function handleResetPassword(){
    const axiosHelper = new axiosService()
    const REQ_URL = "/users/getOneByUsername/" + usernameLogin;
    console.log(REQ_URL);
    const pass = await axiosHelper.getDataWithoutLogin(REQ_URL)
    setPasswordLogin(pass.password)
  }

  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required onChange={event => setUsernameLogin(event.target.value)} />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" value={passwordLogin} required onChange={event => setPasswordLogin(event.target.value)} />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
        <div className="resetButton-container">
          <input type="button" value="Forgot password?" onClick={handleResetPassword} />
        </div>
      </form>
    </div>
  );

  return (
    <div className="loginContainer">
      <div className="login-form">
        <div className="title">Sign In / <Link className="secondTitle" to="/register">Sign up</Link></div>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
      </div>
    </div>
  );
}

