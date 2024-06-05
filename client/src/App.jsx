import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Routes, Route, Link, useNavigate} from "react-router-dom";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import SignUp from "./pages/signUp";
import Upload from "./pages/upload";
import Resources from "./pages/resources";
import authContext from "./contexts/authContext";
import RequireAuth from "./components/RequireAuth";
import SideNav from "./components/SideNav";
import TopNav from "./components/TopNav";


function App() {

  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );

  function signIn () {
    setIsLoggedIn(true);
    navigate("/home"); // Maybe this needs to change since we want to change the state of the home page but not LEAVE it??
  }

  function signOut () {
    setIsLoggedIn(false);
    navigate("/home"); //Again, whats the best way to handle this? 
  }

  const auth = {
    isLoggedIn,
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
</div>
<div>
  <Routes>  
    <Route path="/login" element={<Login />}/>
    <Route path="/signUp" element={<SignUp />}/>
    <Route path="/" element={<Home />}/>
    <Route path="/resources/:id" element={<Resources />}/> {/* require auth? */}
    <Route path="/upload" element={<Upload />}/> {/* <RequireAuth></RequireAuth> */}
    <Route path="/dashboard" element={<Dashboard />}/> {/* <RequireAuth></RequireAuth> */}
  </Routes> 
</div>
  </authContext.Provider>

  );
}

export default App;
