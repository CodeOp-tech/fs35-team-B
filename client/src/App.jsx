import React, { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import {Routes, Route, Link, useNavigate} from "react-router-dom";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Register from "./pages/register";
import Login from "./pages/login";// deleting this page!!
import Register from "./pages/register";// client\src\pages\register.jsx
import Upload from "./pages/upload";
import Resources from "./pages/resources";
import authContext from "./contexts/authContext";
import RequireAuth from "./components/RequireAuth";
import SideNav from "./components/SideNav";
import TopNav from "./components/TopNav";


function App() {

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [username, setUserName] = useState(localStorage.getItem("username") || "");

  useEffect(() => {
    console.log('Login Status Changed', isLoggedIn);
  }, [isLoggedIn]);

  function signIn (username) { //added "context" items here, trial run
    setIsLoggedIn(true);
    setUserName(username);
    localStorage.setItem("username", username)
    navigate("/"); 
  }

  function signOut() {
    setIsLoggedIn(false);
    setUserName("");
    localStorage.removeItem("username");
    navigate("/"); //Again, whats the best way to handle this? 
  }

  const auth = {
    isLoggedIn,
    username,
    signIn,
    signOut
  }



  return (
<authContext.Provider value={auth}>
<div>
  < TopNav />
</div>
<div>
  <Link to="/upload">Upload</Link>
  <Link to="/">Home</Link>
  <Link to="/resources/:id">Resources</Link>

  
  
</div>
<div>
  <Routes>  
    <Route path="/register" element={<Register />}/>
    <Route path="/" element={<Home />}/>
    <Route path="/resources" element={<Resources />}/>
  <Link to="/register">Register</Link>
</div>
<div>
  <Routes>  
    
    <Route path="/" element={<Home />}/>
    <Route path="/register" element={<Register />}/>
    <Route path="/resources/:id" element={<Resources />}/>
    <Route path="/upload" element={<Upload />}/>
    <Route path="/dashboard" element={<Dashboard />}/>
  </Routes> 
</div>
  <SideNav/>
  </authContext.Provider>
  
  );
}

export default App;
