import React, { useState, useContext}  from 'react';
import authContext from "../contexts/authContext";
import axios from 'axios';
import { Link } from 'react-router-dom';


const TopNav = () => {

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [data, setData] = useState(null);

  const { username, password } = credentials;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const login = async () => {
    try {
      //fetch to backend route to login w my creds
      const { data } = await axios("/api/auth/login", {
        method: "POST",
        data: credentials,
      });
  
      //store it locally
      localStorage.setItem("token", data.token);
      console.log(data.message, data.token);
    } catch (error) {
      console.log(error);
    }
  };  

  const logout = () => {
    localStorage.removeItem("token");
  };



  return (
    //build simple visual tests: 2 inputs, username, pass, button 
    //needs handleinputchange to set creds 
    <>
    <div>topNav</div>
      <div>
        <input 
        value={username}
        onChange={handleChange}
        name='username'
        type='text'
        className='' 
        />
        <input 
        value={password}
        onChange={handleChange}
        name='password'
        type='password'
        className='' 
        />
      </div>
      <div>
        <button className='' onClick={login}>
          Log In 
        </button>
        <button className='' onClick={{logout}}>
          Log Out 
        </button>
      </div>



    </>
  )
};

export default TopNav; 