import React, { useEffect, useState, useContext} from 'react'
import {useParams, useSearchParams} from "react-router-dom";
import authContext from "../contexts/authContext";
import CategoriesContext from '/src/contexts/categoriesContext';

function resources() {
 
    // what i want to do here is to fetch the resources route
    // put out the list of resources, i need
    //  in the front end, we always pass the token along
    // http://localhost:5173/resources?category_id=3


// state to store fetched resources

const {isLoggedIn, username, signIn, signOut} = useContext(authContext);
const { categories, setCategories } = useContext(CategoriesContext);
const [resourcesData, setResourcesData ] = useState ([]);
const [resources, setResources] = useState([])

// search params to access the query parameters from the url in postman (resources?category=3)
const [searchParams] = useSearchParams();


// use effect when fetching resources


useEffect(() => {
    console.log(searchParams.get("category_id"))


    const fetchResources = async () => {
      try {
        //get the value of 'category_id from search params
        const category = searchParams.get('category_id');
        const token = localStorage.getItem('token');

        const headers = {};
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
       
        const response = await fetch(`/api/resources?category=${category}`, {
          headers
        });
        if (!response.ok) {
          throw new Error('error found');
        }
        const data = await response.json();
        setResourcesData(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };


// fetch data when search params changes
if (searchParams) {
    fetchResources();
  }
}, [searchParams]);

const deleteResource = (id) => {     
      fetch(`/api/resources/${id}`, {
        method: "DELETE",
         headers: {          
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
      })
      .then((response) => response.json())
      .then((resource) => {
      setResources(resource);
      })
      .catch((error) => {
        console.log(error)
       
      });
    };


return (
    <div>
        <h1>Resources</h1>
        <br />
        <br />
        {isLoggedIn? (
          <div>
          <h3>Welcome to your personal resources page.</h3>
          <br />
          <h5>Bring order to the chaos.</h5>
          <br />
          <br />
          <img src="https://media3.giphy.com/media/RbDKaczqWovIugyJmW/200.webp?cid=790b76111uc2ygprpe624yogorzd8pyctlbdoh3qq8k656vd&ep=v1_gifs_search&rid=200.webp&ct=g" alt="" />
        </div>) : (<h5>Please select a category to see resources</h5>)}
        <ul>
            {resourcesData.map(resource => (
                <li key={resource.id}>
              <h2>{resource.notes}</h2>
           <p>
            <a href={resource.link_url}>Link</a>
           {isLoggedIn && resource.user_id !== 0 ?
            (<button onClick={()=>deleteResource(resource.id)}>❌</button>) : null}
           </p>
           <p>
            <a href={resource.vid_url}>Video</a>
            {isLoggedIn && resource.user_id !== 0 ?
            (<button onClick={()=>deleteResource(resource.id)}>❌</button>) : null}
          </p>
           {resource.img}
           <img src={`/uploads/${resource.img}`}
           alt={resource.notes}
          />
          {isLoggedIn && resource.user_id !== 0 ?
            (<button onClick={()=>deleteResource(resource.id)}>❌</button>) : null}
          <p>
            <a href = {`/uploads/${resource.doc}`} download >Document</a>
            {isLoggedIn && resource.user_id !== 0 ?
            (<button onClick={()=>deleteResource(resource.id)}>❌</button>) : null}
          </p>
                </li>
            ))}
        </ul>
    </div>
);
};
export default resources;




