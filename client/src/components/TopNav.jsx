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

    <nav className="navbar navbar-expand-sm navbar-light bg-light fixed-top w-100">
    <Link className="navbar-brand" to="/">🦆</Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ml-auto w-100 d-flex justify-content-between">
        { !isLoggedIn ? (
          <>
            <li className="nav-item d-flex align-items-center">
              <form className="form-inline d-flex" onSubmit={login}>
                <input
                  required
                  value={credentials.username}
                  onChange={handleChange}
                  name="username"
                  placeholder="Username"
                  type="text"
                  className="form-control mr-sm-2"
                />
                <input
                  required
                  value={credentials.password}
                  onChange={handleChange}
                  name="password"
                  placeholder="Password"
                  type="password"
                  className="form-control mr-sm-2"
                />
                <button type="submit" className="btn btn-primary my-2 my-sm-0">Log In</button>
              </form>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">Register</Link>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item d-flex align-items-center">
              <span className="navbar-text">Hello, {username}!</span>
            </li>
            <li className="nav-item">
              <button className="btn btn-primary" onClick={logout}>Log Out</button>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to="/resources">Resources</Link>
            </li> */}
          </>
        )}
      </ul>
    </div>
  </nav>




    // <nav>
    //   <ul>
    //     { !isLoggedIn ? (
    // <>      
    //   <div>
    //     <form onSubmit={login}>
    //       <input 
    //         required
    //         value={credentials.username}
    //         onChange={handleChange}
    //         name='username'
    //         placeholder='enter username'
    //         type='text'
    //         className='form-control' 
    //         />
    //       <input 
    //       required
    //       value={credentials.password}
    //       onChange={handleChange}
    //       name='password'
    //       placeholder='enter password'
    //       type='password'
    //       className='form-control' 
    //       />
    //       <div className='invalid-feedback'>Username & Password are Required.</div>
    //       <button type='submit' className='btn btn-primary'>Log In</button>
    //     </form>
    //   </div>
    //   <div>
    //     <p>No Account Yet? Click here to <Link to="/register" >register</Link>!</p>
    //   </div>
    // </>
    // ) : (
    // <>
    //   <div>
    //     <p> Hello, {username}!</p>
    //   </div>
    //   <div>
    //     <button className='btn btn-primary' onClick={logout}>Log Out</button>
    //   </div>
    //   <div>
    //     <p>Go to your <Link to="/resources">resources</Link>!</p>
    //   </div>
    // </>  
    // )}
    //   </ul>
    // </nav>
  )
};

export default TopNav; 