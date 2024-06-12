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

const deleteResource = (id, field) => { 
  let payload = { [field]: true}    
      fetch(`/api/resources/${id}`, {
        method: "PUT",
         headers: {    
          "Content-Type": "application/json",      
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
         body: JSON.stringify(payload)
      })
      .then((response) => response.json())
      .then((resource) => {
      setResourcesData(resource);
      })
      .catch((error) => {
        console.log(error)
       
      });
      
    };


return (
    <div className='content resources-page' >
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
          <img src="https://media3.giphy.com/media/RbDKaczqWovIugyJmW/200.webp?cid=790b76111uc2ygprpe624yogorzd8pyctlbdoh3qq8k656vd&ep=v1_gifs_search&rid=200.webp&ct=g" alt="" className="img-fluid mt-4 mb-4" />
        </div>) : (<h5>Please select a category to see resources</h5>)}
        <ul className= "list-group">
        <div className="container">
        <div className="row">
            {resourcesData.map(resource => (

                <li key={resource.id} className="col-md-6 mb-3">
                
              <div className="card h-100" class="shadow p-5 mb-4 bg-body-tertiary rounded">
              <div className="card-body d-flex flex-column justify-content-between">

              <div className="card-body">

              <h5 className="card-title">{resource.notes}</h5>
              
           <p className="card-text">
            {resource.link_url ? ( 
            <a href={resource.link_url} class="btn btn-success"
            > Documentation </a>
          ) : null }
         

           {isLoggedIn && resource.user_id !== 0 ? (
            <button onClick={()=>deleteResource(resource.id, "notes")}className="btn btn-light">❌</button>) : null}
           </p>
        
           <p  className="card-text">
            {resource.vid_url ? (
            <a href={resource.vid_url}  class="btn btn-success"
            > Video</a>
          ): null }
            {isLoggedIn && resource.user_id !== 0 ?

            (<button onClick={()=>deleteResource(resource.id, "vid_url")} className="btn btn-light">❌</button>
           ) : null }

          </p>
          <div className= "card h-100 border-0">
           {resource.img ? (
           <img src={`/uploads/${resource.img}`}

           alt={resource.notes}
           classname = "card-img-top img-fit"
          />
           ) : null }
            </div>
          {isLoggedIn && resource.user_id !== 0 ?

            (<button onClick={()=>deleteResource(resource.id, "img")}className="btn btn-light">❌</button>) : null}
          <p>
            <a href = {`/uploads/${resource.doc}`} download class="btn btn-success"
            > File</a>
            {isLoggedIn && resource.user_id !== 0 ?

            (<button onClick={()=>deleteResource(resource.id, "doc")}className="btn btn-light">❌</button>) : null}
          </p>
              
              </div>
             </div> 
             </div>
           </li>
                
           ))}
            </div>
          </div>
        </ul>
        
    </div>
    
    
);
};
export default resources;




