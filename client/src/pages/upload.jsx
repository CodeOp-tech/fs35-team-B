import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import CategoriesContext from '/src/contexts/categoriesContext';

export default function Upload() {
  const { categories, setCategories } = useContext(CategoriesContext); 

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

  const [selectedImage, setSelectedImage] = useState(null);

  const [selectedDocument, setSelectedDocument] = useState(null);

  const [error, setError ] = useState("");
 

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

  // useEffect(() => {
  //   // Fetch categories with async/await
  //   async function fetchCategories() {
  //     try {
  //       const res = await fetch("/api/categories");
  //       const data = await res.json();
  //       setCategories(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   fetchCategories();
  // }, []);
  
 
  const addCategory = async () => {
    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(newCategory)
      });
      const categories = await response.json();
      setCategories(categories);
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
    if (input.link_url) {
      formData.append("link_url", input.link_url);
    }
    if (input.vid_url) {
      formData.append("vid_url", input.vid_url);
    }
    if (input.notes) {
      formData.append("notes", input.notes);
    }
    if (input.category_id) {
      formData.append("category_id", input.category_id);
    }

    try {
      const res = await axios.post("/api/resources", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
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
      setError("")
    } catch (error) {
      setError("Please select a category.")
      console.log(error);
    }
  };


  return (
    <div className='content upload-page' >
    <div className="create-category-container">
      <br />
      <br />
      <h3>Manage your resources</h3>
      <br />
      <br />
      <div>
        <p><strong>Create your own categories:</strong></p>
      <form className='from-group' onSubmit={handleCategorySubmit}>
        <label htmlFor="category">New Category</label>
        <input
          type="text"
          name="type"
          value={newCategory.type}
          onChange={handleCategoryChange}
          className="form-control"
        />
        <button className="btn btn-outline-secondary" type="submit">Add Category</button>
      </form>
      </div>
      <br />
      <div className="create-resource-container">
        <p><strong>Upload your personal resources:</strong></p>
      <form className='from-group' onSubmit={handleUpload}> 
        <label className='form-label' htmlFor="link_url">Website Link</label>
        <input
          type="text"
          name="link_url"
          value={input.link_url}
          onChange={handleInputChange}
          className="form-control"
        />
        <label className='form-label' htmlFor="vid_url">Video Link</label>
        <input
          type="text"
          name="vid_url"
          value={input.vid_url}
          onChange={handleInputChange}
          className="form-control"
        />
        <label className='form-label' htmlFor="doc">Select Document</label>
        <input type="file" name="doc" onChange={handleInputChange} className="form-control"/>
        <label className='form-label' htmlFor="img">Select Image</label>
        <input type="file" name="img" onChange={handleInputChange} className="form-control"/>
        <label className='form-label' htmlFor="notes">Notes</label>
        <textarea
          name="notes"
          value={input.notes}
          onChange={handleInputChange}
          className="form-control"
        ></textarea>
        <label htmlFor="category">Category</label>
        <div className='invalid-feedback'>Selecting a Category is Required.</div>
        <select
          name="category_id"
          value={input.category_id}
          onChange={handleInputChange}
          className="form-control"
          required="require"     
        >
          <option value="">Select Category</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.type}
            </option>
          ))}
        </select>        
        <button className="btn btn-outline-secondary" type="submit">Upload</button> 
      </form> 
      </div>   
    </div>
    </div>
  );
}