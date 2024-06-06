import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Upload() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
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
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [error, setError] = useState ("")

  useEffect(() => {
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
  }, [newCategory]);
 
  const handleCategoryChange = event => {
    const { value } = event.target;
    if (value === "add-category") {
      setIsAddingCategory(true);
      setInput(state => ({ ...state, category_id: "" }));
    } else {
      setIsAddingCategory(false);
      setInput(state => ({ ...state, category_id: value }));
    }
  };

  const handleInputChange = event => {
    const { name, value, files } = event.target;
    if (name === "img") {
      setSelectedImage(files[0]);
    } else if (name === "doc") {
      setSelectedDocument(files[0]);
    } else {
      setInput(state => ({ ...state, [name]: value }));
    }
  };

  const handleUpload = async event => {
    event.preventDefault();
    if (isAddingCategory) {
      await addCategory();
    } else {
      await addResources();
    }
  };

  const addCategory = async () => {
    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ type: newCategory })
      });
      const category = await response.json();
      setCategories(prevCategories => [...prevCategories, category]);
      setNewCategory("");
      setInput(state => ({ ...state, category_id: category.id }));
      setIsAddingCategory(false); // Reset adding category state
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
    <div className="container text-center">
      <div className="row">      
          {isAddingCategory && (
            <form className="form-group" onSubmit={handleUpload}>
              <label className="form-label" htmlFor="new-category">New Category</label>
              <input
                type="text"
                name="new-category"
                value={newCategory}
                onChange={e => setNewCategory(e.target.value)}
                placeholder="Enter Category"
                className="form-control"
              />
              <button className="btn btn-outline-secondary" type="submit">Add Category</button>
            </form>
          )}        
          <form className="form-group" onSubmit={handleUpload}>
            <label className="form-label" htmlFor="link_url">Website Link</label>
            <input
              type="text"
              name="link_url"
              value={input.link_url}
              onChange={handleInputChange}
              placeholder="Enter Website/Article-Link"
              className="form-control"
            />
            <label className="form-label" htmlFor="vid_url">Video Link</label>
            <input
              type="text"
              name="vid_url"
              value={input.vid_url}
              onChange={handleInputChange}
              placeholder="Enter Video-Link"
              className="form-control"
            />
            <label className="form-label" htmlFor="doc">Select Document</label>
            <input type="file" name="doc" onChange={handleInputChange} className="form-control" />
            <label className="form-label" htmlFor="img">Select Image</label>
            <input type="file" name="img" onChange={handleInputChange} className="form-control" />
            <label className="form-label" htmlFor="notes">Notes</label>
            <textarea
              name="notes"
              value={input.notes}
              onChange={handleInputChange}
              placeholder="Enter Notes"
              className="form-control"
              rows="5"
            />
            <label className="form-label" htmlFor="category">Category</label>
            <select
              name="category_id"
              value={input.category_id}
              onChange={handleCategoryChange}
              className="form-control"
            >
              <option value="">Select Category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.type}
                </option>
              ))}
              <option value="add-category">Add Category</option>
            </select>
            <button className="btn btn-outline-secondary" type="submit">Upload</button>
          </form>
          
        </div>
      </div>    
  );
}
