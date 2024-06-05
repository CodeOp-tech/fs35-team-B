import React, { useState, useContext}  from 'react';
import authContext from "../contexts/authContext";
import axios from 'axios';
import { Link } from 'react-router-dom';

const TopNav = () => {


  const {signIn} = useContext(authContext);
  const {isLoggedIn, signOut} = useContext(authContext); //use in return for conditional displays

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
      signIn();
      console.log(data.message, data.token);
    } catch (error) {
      console.log(error);
    }
  };  

//   const logout = () => {
//     localStorage.removeItem("token");
//   };



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
        <button className='' onClick={login}> {/* Toggles */}
          Log In 
        </button>
        <button className='' onClick={logout}> {/* Toggles */}
          Log Out 
        </button>
      </div>
      <div>
        <p>No Account Yet? Click here to  <Link Link to="/signUp">register</Link> ! </p>
      </div>
      <div>
        <Link to="/dashboard"> Dashboard </Link> {/* Toggles */}
      </div>




};

export default TopNav; 