import React, { useState, useContext}  from 'react';
import authContext from "../contexts/authContext";
import axios from 'axios';
import { Link } from 'react-router-dom';
import Modal from 'react-modal'; //experiment!!

const TopNav = () => {

  const {isLoggedIn, username, signIn, signOut} = useContext(authContext);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  // const [errorMessage, setErrorMessage ] = useState(""); PRIOR error message, you can get this back!

  const [isError, setIsError] = useState(false); //trying something new with modal and history


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
      // setErrorMessage("") PRIOR error message, you can get this back!
      setIsError(false); //new thing
    } catch (error) {
      console.log(error);
      // setErrorMessage("Please Create an Account to Log In"); PRIOR error message, you can get this back!
      setIsError(true); //new thing
    }
  };  

  const logout = () => {
    localStorage.removeItem("token");
    signOut();
    console.log("Successfully Logged Out!")
  };

  const closeModal = () => { //new thing
    setIsError(false);
  };

  const redirectToRegister = () => { //new thing
    window.location.href = '/register';
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

      <Modal className='loginModal' isOpen={isError} onRequestClose={closeModal}> 
        <h2>Error</h2>
        <div>
          Please Register to log in. Click<button onClick={redirectToRegister} style={{color:"blue", background:"none",border:"none", textDecoration:"underline", cursor:"pointer"}}>here</button>to register.
        </div>
        <button onClick={closeModal}>Close</button>
      </Modal>
      
      {/* {errorMessage && (
        <div className="error-message">  <--- old thing that works, can get this back if you need
          <p>{errorMessage}</p>
        </div>
      )} */}
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