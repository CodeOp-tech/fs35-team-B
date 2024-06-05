import React, { useState, useEffect } from "react";
import TopNav from "../components/TopNav";
import SideNav from "../components/SideNav";
import {Link} from "react-router-dom"; 
import { useParams } from "react-router-dom"; 

export default function home() {
  
  const [resources, setResources] = useState([]);
  const [categories, setCategories] = useState([]);

useEffect(() => {
  fetch("/api/publicResource")
  .then((res) => res.json())
  .then((data) => {
  setResources(data);
  });

  fetch("/api/categories/")
  .then((res) => res.json())
  .then((data) => {
    setCategories(data);
  });
}, []);


  return (
    <div>
      <h1>The Confused Coder 🦆</h1>
      <h3>General Resources</h3>
      


    </div>
  )
}
