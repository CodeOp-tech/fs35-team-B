import React, { useState, useContext}  from 'react';
import authContext from "../contexts/authContext";
import axios from 'axios';
import { Link } from 'react-router-dom';


const TopNav = () => {

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

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
    
    <div>topNav</div>


  )
};

export default TopNav; 