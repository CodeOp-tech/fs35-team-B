import React, { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import {Routes, Route, Link, useNavigate} from "react-router-dom";
import Home from "./pages/home";
import Register from "./pages/register";
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
  
  //new state: categories; context provider

  useEffect(() => {
    console.log('Login Status Changed', isLoggedIn);
  }, [isLoggedIn]);

  function signIn (username) { 
    setIsLoggedIn(true);
    setUserName(username);
    localStorage.setItem("username", username)
    navigate("/"); 
  }

  function signOut() {
    setIsLoggedIn(false);
    setUserName("");
    localStorage.removeItem("username");
    navigate("/"); 
  }

  const auth = {
    isLoggedIn,
    username,
    signIn,
    signOut
  }

//categories context provider here
  return (
<authContext.Provider value={auth}>

<div>
  < TopNav />
</div>
<div>
  {isLoggedIn ? <Link to="/upload">Upload</Link> : null}
  <Link to="/">Home</Link>
  <Link to="/resources/:id">Resources</Link>
  <Link to="/register">Register</Link>
</div>
<div>
  <Routes>  
    
    <Route path="/" element={<Home />}/>
    <Route path="/register" element={<Register />}/>
    <Route path="/resources/:id" element={<Resources />}/>
    <Route path="/upload" element=  {<RequireAuth><Upload /></RequireAuth>}/> 
  </Routes> 
</div>
  <SideNav/>
  </authContext.Provider>
  
  );
}

export default App;