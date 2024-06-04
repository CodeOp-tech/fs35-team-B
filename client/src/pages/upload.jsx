import { useState, useEffect } from 'react';


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

useEffect(() => {
    //fetch categories(
    fetch("api/categories")
    .then((res) => res.json())
    .then((data) => {
        setCategories(data);
    });
},[]);

  return (
    <div>
        <form action="upload">
            <label htmlFor="link_url">Website Link</label>
            <input type="text" name="link_url" />
            <label htmlFor="vid_url">Video Link</label>
            <input type="text" name="vid_url"  />
            <label htmlFor="doc">Select Document</label>
            <input type="file" name="doc" />
            <label htmlFor="img">Select Image</label>
            <input type="file" name="img" />
            <label htmlFor="notes">Notes</label>
            <textarea name="notes"></textarea>
            <label htmlFor="category">Category</label>
            <select name="category_id" id="">
                <option value="">Select Category</option>            
            {categories.map(category => (
                <option key={category.id} value={category.id}>{category.type}</option>) 
            )} 
            </select>               
            <button>Upload</button>
        </form>
        <br />
        <form action="submit">
            <label htmlFor="category">New Category</label>
            <input type="text" value={newCategory.type} />
            <button>Add Category</button>
        </form>
    </div>
  )
}
