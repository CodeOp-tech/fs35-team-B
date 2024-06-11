import React, { useEffect, useState, useContext} from 'react'
import {useParams, useSearchParams} from "react-router-dom";
import authContext from "../contexts/authContext";

function resources() {
 
    // what i want to do here is to fetch the resources route
    // put out the list of resources, i need
    //  in the front end, we always pass the token along
    // http://localhost:5173/resources?category_id=3


// state to store fetched resources

const {isLoggedIn, username, signIn, signOut} = useContext(authContext);
const [resourcesData, setResourcesData ] = useState ([]);

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
      .then((category) => {
        setCategories(category);
      })
      .catch((error) => {
        console.log(error)
       
      });
    };


return (
    <div>
        <h1>Resources</h1>
        <ul>
            {resourcesData.map(resource => (
                <li key={resource.id}>
              <h2>{resource.notes}</h2>
           <p>
            <a href={resource.link_url}>Link</a>
           {isLoggedIn ?
            (<button onClick={()=>deleteResource(resource.id)}>❌</button>) : null}
           </p>
           <p>
            <a href={resource.vid_url}>Video</a>
            {isLoggedIn ?
            (<button onClick={()=>deleteResource(resource.id)}>❌</button>) : null}
          </p>
           {resource.img}
           <img src={`/uploads/${resource.img}`}
           alt={resource.notes}
          />
          {isLoggedIn ?
            (<button onClick={()=>deleteResource(resource.id)}>❌</button>) : null}
          <p>
            <a href = {`/uploads/${resource.doc}`} download >Document</a>
            {isLoggedIn ?
            (<button onClick={()=>deleteResource(resource.id)}>❌</button>) : null}
          </p>
                </li>
            ))}
        </ul>
    </div>
);
};
export default resources;




