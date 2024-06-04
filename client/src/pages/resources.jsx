import React, { useEffect, useState } from 'react'

// so here based on the selected category ( the button ), then the contents from the database will appear based on the type of category clicked
// so fetch the data by resource id from backend 
function resources() {
 
  // state that holds the data fetched from the backend
const [resourcesData, setResourcesData] = useState([]);

// state that holds the current selected category 
const [selectedCategory, setSelectedCategory] = useState(null);

// so data from the backend is fetched based on the selected category 
  if (selectedCategory)
  fetch (`api/privateResource/id/${selectedCategory}`)
  .then((res) => {
    if (!res.ok) {
      throw new error ('error found')
    }
    return res.json ();
  })
  .then((data) => setResourcesData(data))
  .catch((error) => {
    console.log("error")
  });


 

  return (
    <div>
      <h3> Show Resources  </h3>
      <button > Javascript </button>
      </div>
  )
}


export default resources;