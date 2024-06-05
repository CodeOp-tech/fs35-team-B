import React, { useEffect, useState } from 'react'
import {useParams} from "react-router-dom";

// so here based on the selected category ( the button ), then the contents from the database will appear based on the type of category clicked
// so fetch the data by resource id from backend 
function resources() {
 
//   // state that holds the data fetched from the backend
// const [resourcesData, setResourcesData] = useState([]);



// // so data from the backend is fetched based on the selected category 
// const {id} = useParams ();

//   const fetchResources = async () => {
//       try {
//  const response= await fetch (`/api/privateResource/${id}`)
//  const data = await response.json();
//     setResourcesData([data]);
//     console.log([data]);
//   } catch(error) {
//     console.log(error);

//   }
//  };



//  // fetch the data and run it when the button is clicked 
//   useEffect(() => {
//     fetchResources ();
//     fetchCategories();
// }, [id]);


//   // this should be based on the category type selected
//   const handleCategoryClick = (resources) => {
//     console.log(resources)

//   };

  

// // what i want to show up is the link url based on the category id from the table resources. 
// // so the thing from the category that i want to show up is the type as it contains the name 

// return (
//   <div>
//     <h3>Show Resources</h3>
//     <button key = {categories.type} onClick={() => handleCategoryClick(categories)}>Javascript</button>
//     {resourcesData.length > 0 && (  // Check if resources exist before mapping
//       resourcesData.map((resource) => (
//         <div key={resource.id}>
//           <a href={resource.link_url}></a> 
//           <p> {resourcesData.category_type}</p>
//         </div>

//       ))
//     )}
//   </div>
// );
}


export default resources;