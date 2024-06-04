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
  

  return (
<>
<div>
  <Link to="/upload">Upload</Link>
</div>
  <Routes>  
    <Route path="/login" element={<Login />}/>
    <Route path="/signUp" element={<SignUp />}/>
    <Route path="/" element={<Home />}/>
    <Route path="/resources/:id" element={<Resources />}/>
    <Route path="/upload" element={<Upload />}/>
    <Route path="/dahsboard" element={<Dashboard />}/>
   </Routes> 
 </>

  )
}

export default App
