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

    const deleteCategory = (id) => {
      fetch(`/api/categories/${id}`, {
        method: "DELETE",
      })
      .then((response) => response.json())
      .then((category) => {
        setCategoryData(category);
      })
      .catch((error) => {
        console.log(error)
      });
    };



    return (
        <div className = "sideBar">

          
                {categoryData.map(category => (
             <button onClick ={() => handleClick (category.id)} key={category.id}> {category.type} <button onClick={() => deleteCategory(category.id)}>❌</button></button>
    
                ))}
           

        </div>
      );
    };
    
export default SideNav;