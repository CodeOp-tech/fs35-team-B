import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import  CategoriesContext from '/src/contexts/categoriesContext';
import authContext from "../contexts/authContext";


function SideNav() {
  
  const { categories, setCategories } = useContext(CategoriesContext);
  const {isLoggedIn, username, signIn, signOut} = useContext(authContext);
    
    useEffect(() => {
    
        const fetchCategories = async () => {
          try {
            const token = localStorage.getItem ("token");
            // checks if the token exists in the local storage 
            const headers = {};
            if (token) {
              headers['Authorization'] = `Bearer ${token}`;
            }
          // fetches the categories together w
            const response = await fetch(`/api/categories`, {headers});
            if (!response.ok) {
              throw new Error('error found');
            }
            const data = await response.json();
            setCategories(data);
            console.log('Fetched categories', data);
          } catch (error) {
            console.error('Error:', error);
          }
        }

    fetchCategories();
    }, [isLoggedIn]);
    
    const navigate = useNavigate ()
    const handleClick = (category_id) => {
        navigate(`/resources?category_id=${category_id}`);
    };

    const deleteCategory = (id) => {
      alert("Do you really want to delete the category and all its possible resources?")
      fetch(`/api/categories/${id}`, {
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
    <div className="sideBar">
    {categories.map(category => (
      <div key={category.id}>
        <button onClick={() => handleClick(category.id)}> {category.type} </button>
        {isLoggedIn && category.user_id !== 0 ? (
          <button onClick={() => deleteCategory(category.id)}>❌</button>
        ) : null}
      </div>
    ))}
    </div>
  </div>
);

    };
    
export default SideNav;