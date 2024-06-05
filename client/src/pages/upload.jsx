import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Upload() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    type: ""   
  });
 
  const [input, setInput] = useState({
    link_url: "",
    vid_url: "",
    doc: "",
    img: "",
    notes: "",
    category_id: ""   
  });


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

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);

  const handleCategoryChange = event => {
    const { name, value } = event.target;
    setNewCategory(state => ({ ...state, [name]: value }));
  }

  const handleCategorySubmit = event => {
    event.preventDefault();
    addCategory();
  }

 
  const handleInputChange = event => {
    const { name, value, files } = event.target;
    if (name === "img") {
      setSelectedImage(files[0]); 
    } else if (name === "doc") {
      setSelectedDocument(files[0]); 
    } else {
      setInput(state => ({ ...state, [name]: value })); 
    }
  }

  const handleUpload = event => {
    event.preventDefault();
    addResources();
  }

  useEffect(() => {
    // Fetch categories with async/await
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();

        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCategories();
  }, []);

  const addCategory = async () => {
    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCategory)
      });
      const category = await response.json();
      setCategories(prevCategories => [...prevCategories, category]);
      setNewCategory({
        type: ""
        
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addResources = async () => {
    const formData = new FormData();
    if (selectedImage) {
      formData.append("imagefile", selectedImage); 
    }
    if (selectedDocument) {
      formData.append("document", selectedDocument); 
    }    
    formData.append("link_url", input.link_url);
    formData.append("vid_url", input.vid_url);
    formData.append("notes", input.notes);
    formData.append("category_id", input.category_id);
    

    try {
      const res = await axios.post("/api/privateResource", formData, {
        headers: {
          "Content-Type": "multipart/form-data", 
        },
      });
      
      console.log("Uploaded successfully:", res.data);
       setInput({
        link_url: "",
        vid_url: "",
        notes: "",
        category_id: ""        
      });
      setSelectedImage(null);
      setSelectedDocument(null);
    } catch (error) {
      console.log(error);
    }
  }

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

      <form onSubmit={handleCategorySubmit}>
        <label htmlFor="category">New Category</label>
        <input
          type="text"
          name="type"
          value={newCategory.type}
          onChange={handleCategoryChange}
        />
        <button type="submit">Add Category</button>
      </form>
      <br />
      <form onSubmit={handleUpload}> 
        <label htmlFor="link_url">Website Link</label>
        <input
          type="text"
          name="link_url"
          value={input.link_url}
          onChange={handleInputChange}
        />
        <label htmlFor="vid_url">Video Link</label>
        <input
          type="text"
          name="vid_url"
          value={input.vid_url}
          onChange={handleInputChange}
        />
        <label htmlFor="doc">Select Document</label>
        <input type="file" name="doc" onChange={handleInputChange} />
        <label htmlFor="img">Select Image</label>
        <input type="file" name="img" onChange={handleInputChange} />
        <label htmlFor="notes">Notes</label>
        <textarea
          name="notes"
          value={input.notes}
          onChange={handleInputChange}
        ></textarea>
        <label htmlFor="category">Category</label>
        <select
          name="category_id"
          value={input.category_id}
          onChange={handleInputChange}
        >
          <option value="">Select Category</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.type}
            </option>
          ))}
        </select>
        <button type="submit">Upload</button> 
      </form>

    </div>
  );
}
