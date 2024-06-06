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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const login = async (e) => { 
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/auth/login", credentials);
      localStorage.setItem("token", data.token);
      signIn(credentials.username);
      setCredentials({username:"", password:""});
      console.log(data.message, data.token);
    } catch(error){
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
        <form onSubmit={login}>
          <input 
            required
            value={credentials.username}
            onChange={handleChange}
            name='username'
            placeholder='enter username'
            type='text'
            className='form-control' 
            />
          <input 
          required
          value={credentials.password}
          onChange={handleChange}
          name='password'
          placeholder='enter password'
          type='password'
          className='form-control' 
          />
          <div className='invalid-feedback'>Username & Password are Required.</div>
          <button type='submit' className='btn btn-primary'>Log In</button>
        </form>
      </div>
      <div>
        <p>No Account Yet? Click here to <Link to="/register" >register</Link>!</p>
      </div>
    </>
    ) : (
    <>
      <div>
        <p> Hello, {username}!</p>
      </div>
      <div>
        <button className='btn btn-primary' onClick={logout}>Log Out</button>
      </div>
      <div>
        <p>Go to your <Link to="/resources">resources</Link>!</p>
      </div>
    </>  
    )}
      </ul>
    </nav>
  )
};

export default TopNav; 