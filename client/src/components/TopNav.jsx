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

  const closeNavbar = () => {
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarToggler.classList.contains('show')){
      navbarToggler.click();
    }
  };


  return (
    <nav className="navbar navbar-expand-sm fixed-top w-100"> {/* navbar-light bg-light */}
    <Link className="navbar-brand" to="/" onClick={closeNavbar} >🦆</Link>
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
            <li className='nav-item'>
              <Link className='nav-link' to='/resources' onClick={closeNavbar}  >Resources</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/register' onClick={closeNavbar} >Register</Link>
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
            <li className="nav-item">
              <Link className="nav-link" to="/resources" onClick={closeNavbar} >Resources</Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/upload'>Upload</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  </nav>
  )
};
export default TopNav;