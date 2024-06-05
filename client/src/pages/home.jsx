import React, { useState, useEffect } from "react";
import TopNav from "../components/TopNav";
import SideNav from "../components/SideNav";
import {Link} from "react-router-dom"; 
import { useParams } from "react-router-dom"; 

export default function home() {
  const {id} = useParams();
  const [resources, setResources] = useState([]);
  const [categories, setCategories] = useState([]);

useEffect(() => {
  fetch("/api/publicResource")
  .then((res) => res.json())
  .then((data) => {
  setResources(data);
  });

  fetch(`/api/categories/${id}`)
  .then((res) => res.json())
  .then((data) => {
    setCategories(data);
  });
}, [id]);


  return (
    <div>
      <h1>The Confused Coder 🦆</h1>
      <h3>General Resources</h3>
      {/* <ul>
        <h4>Websites:</h4>
        {resources.map((resource) => <li key={resource.id}>{resource.link_url}</li>)}
      </ul> */}


    </div>
  )
}
