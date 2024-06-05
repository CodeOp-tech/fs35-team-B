import { useState, useEffect } from 'react';
import axios from 'axios';


export default function upload() {
const [categories, setCategories] = useState([]);
const [newCategory, setNewCategory] = useState({
    type:"",
    user_id:""
});
const [resources, setResources] = useState([]);
const [input, setInput] = useState({
    link_url:"",
    vid_url:"",
    doc:"",
    img:"",
    notes:"",
    category_id:"",
    user_id:""
});

const [selectedImage, setSelectedImage] = useState(null);
const [selectedDocument, setSelectedDocument] = useState(null);

const handleCategoryChange = event => {
    const {name, value} = event.target;
    setNewCategory((state) => ({...state,[name]:value}));
}

const handleCategorySubmit = event => {
    event.preventDefault();
    addCategory();
}

// const handleInputChange = event => {    
//     setSelectedDocument(event.target.files[0]);
//     setSelectedImage(event.target.files[0]);
//     const {name, value} = event.target;
//     setInput((state) => ({...state,[name]:value}));
// }

// const handleUpload = event => {
//     event.preventDefault();
//     addResources();
// }

useEffect(() => {
    //fetch categories(
    fetch("api/categories")
    .then((res) => res.json())
    .then((data) => {
        setCategories(data);
    });
},[]);

const addCategory = () => {
    fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        // "Authorization": `Bearer ${localStorage.getItem("token")}`  
        },
        body: JSON.stringify(newCategory)
    })
    .then((response) => response.json())
    .then((category) => {
        setCategories([...category, newCategory]);
        setNewCategory({
            type:""
        });
    })
    .catch((error) => {
        console.log(error)
    });
};

// const addResources = async () => {
//     const formData = new FormData();
//     formData.append("imagefile", selectedImage, selectedImage.name);
//     formData.append("document", selectedDocument, selectedDocument.name);
//     try {
//         const res = await axios.post("/api/resources", formData, {
//             headers: {
//                 "Content-Type": "application/json",
//                                 "multipart/form-data",
//             },
        
//         });
//     }
// }

  return (
    <div>
         <form action="submit" onSubmit= {event => handleCategorySubmit(event)}>
            <label htmlFor="category">New Category</label>
            <input type="text" name="type" value={newCategory.type} onChange ={handleCategoryChange} />
            <button>Add Category</button>
        </form>
         <br />
        {/* <form action="upload" >
            <label htmlFor="link_url">Website Link</label>
            <input type="text" name="link_url" value={input.link_url} onChange={handleInputChange}/>
            <label htmlFor="vid_url">Video Link</label>
            <input type="text" name="vid_url" value={input.vid_url} onChange={handleInputChange}/>
            <label htmlFor="doc">Select Document</label>
            <input type="file" name="doc"onChange={handleInputChange} />
            <label htmlFor="img">Select Image</label>
            <input type="file" name="img" onChange={handleInputChange}/>
            <label htmlFor="notes">Notes</label>
            <textarea name="notes" value={input.notes} onChange={handleInputChange}></textarea>
            <label htmlFor="category">Category</label>
            <select name="category_id" id="" value={input.category_id} onChange={handleInputChange}>
                <option value="">Select Category</option>            
            {categories.map(category => (
                <option key={category.id} value={category.id}>{category.type}</option>) 
            )} 
            </select>               
            <button onClick={handleUpload}>Upload</button>
        </form>        */}
    </div>
  )
}
