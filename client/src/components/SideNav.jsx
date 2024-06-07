import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import  CategoriesContext from '/src/contexts/categoriesContext';


function SideNav() {
  
  const { categories, setCategories } = useContext(CategoriesContext);
    
    useEffect(() => {
    
        const fetchCategories = async () => {
          try {
            const response = await fetch(`/api/categories`);
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
    }, [setCategories]);
    
    const navigate = useNavigate ()
    const handleClick = (category_id) => {
        navigate(`/resources?category_id=${category_id}`);
    };



    return (
        <div className = "sideBar">
          {categories.map(category => (
            <button onClick ={() => handleClick (category.id)} key={category.id}> {category.type} </button>
    ))}
        </div>
      );
    };
    
export default SideNav;