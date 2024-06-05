import React, { useState, useContext}  from 'react';
import authContext from "../contexts/authContext";
import axios from 'axios';
import { Link } from 'react-router-dom';


const TopNav = () => {

  const {isLoggedIn, signIn, signOut} = useContext(authContext);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const { username, password } = credentials;

  const [data, setData] = useState(null);

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
          value={username}
          onChange={handleChange}
          name='username'
          placeholder='enter username'
          type='text'
          className='' 
          />
        <input 
        value={password}
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
        <p>No Account Yet? Click here to <Link Link to="/signUp">register</Link> ! </p>
      </div>
    </> 
    ) : (
    <>
      <div>
        <span> Hello, {username}!</span>
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

{/* <div>
<Link to="/dashboard"> Dashboard </Link> 
</div>

<button className='' onClick={logout}> Log Out </button> */}




export default TopNav; 