import React, { useState, useContext}  from 'react';
import authContext from "../contexts/authContext";
import axios from 'axios';
import { Link } from 'react-router-dom';


const TopNav = () => {

  const {isLoggedIn, username, signIn, signOut} = useContext(authContext);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  // const { username, password } = credentials;

  // const [data, setData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const login = async () => {
    try {
      //fetch to backend route to login w my creds
      const { data } = await axios.post("/api/auth/login", credentials);
      //store it locally
      localStorage.setItem("token", data.token);
      signIn(credentials.username);
      setCredentials({ username:"", password:"",});
      console.log(data.message, data.token);
    } catch (error) {
      console.log(error);
    }
  };  

  const logout = () => {
    localStorage.removeItem("token");
    signOut();
    console.log("Successfully Logged Out!")
  };



  return (
    <nav>
      <ul>
        { !isLoggedIn ? (
    <>      
      <div>
        <input 
          value={credentials.username}
          onChange={handleChange}
          name='username'
          placeholder='enter username'
          type='text'
          className='' 
          />
        <input 
        value={credentials.password}
        onChange={handleChange}
        name='password'
        placeholder='enter password'
        type='password'
        className='' 
        />
      </div>
      <div>
        <button className='' onClick={login}> Log In </button>
      </div>
      <div>
        <p>No Account Yet? Click here to <Link Link to="/register">register</Link> ! </p>
      </div>
    </> 
    ) : (
    <>
      <div>
        <p> Hello, {username}!</p>
      </div>
      <div>
        <button className='' onClick={logout} >Log Out</button>
      </div>
      <div>
        <p>Go to your <Link to="/dashboard">resources</Link>!</p>
      </div>
    </>  
    )}
      </ul>
    </nav>
  )
};

export default TopNav; 