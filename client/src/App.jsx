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
import { CategoriesProvider } from '/src/contexts/categoriesContext';


function App() {

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [username, setUserName] = useState(localStorage.getItem("username") || "");

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

  return (
<authContext.Provider value={auth}>
  <CategoriesProvider>
    <div>
    < TopNav />
    </div>
    <nav className="nav d-flex justify-content-start flex-row">
      {isLoggedIn ? (
      <div className="container-links">
        <li className="nav-link">
         <Link to="/upload">Upload</Link> 
        </li>      
      </div> ): null}
       {!isLoggedIn ? (
      <div className="container-links">
        <li className="nav-link">
         <Link to="/register">Register</Link>
        </li>
      </div> ) : null}
      <div className="container-links">
        <li className="nav-link">
        <Link to="/">Home</Link>
        </li>
      </div>
      <div className="container-links"> 
        <li className="nav-link">
        <Link to="/resources/">Resources</Link>
        </li>
      </div>
     
      </nav>

      <div>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/resources/" element={<Resources />}/>
          <Route path="/upload" element=  {<RequireAuth><Upload /></RequireAuth>}/> 
        </Routes> 
      </div>
    <SideNav/>
  </CategoriesProvider>
</authContext.Provider>
);
}

export default App;