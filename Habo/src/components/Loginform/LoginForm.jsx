import React, { useState } from 'react';
import "./LoginForm.scss";
import Logo from "../../assets/images/LogoImage.jpg";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function LoginForm() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3001/api/auth/login', values)
      .then(res => {
        if (res.data.Status === "Success") {
          navigate('/');
        } else {
          alert("Error");
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='LoginForm'>
      <div className="loginFormContainer">
        <img src={Logo} alt="logo" />
        <form className="loginForm" onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder='Enter Your Email'
            onChange={e => setValues({ ...values, email: e.target.value })}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            placeholder='Enter your Password'
            onChange={e => setValues({ ...values, password: e.target.value })}
          />
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;