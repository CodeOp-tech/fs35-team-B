import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SideNav() {

    const [categoryData, setCategoryData] = useState ([]);


    
    // use effect when fetching resources
    
    useEffect(() => {
    
        const fetchCategories = async () => {
          try {
            const response = await fetch(`/api/categories`);
            if (!response.ok) {
              throw new Error('error found');
            }
            const data = await response.json();
            setCategoryData(data);
          } catch (error) {
            console.error('Error:', error);
          }
        }
    
   
    fetchCategories();
    }, []);
    
    const navigate = useNavigate ()
    const handleClick = (category_id) => {
        navigate(`/resources?category_id=${category_id}`);
    };



    return (
        <div className = "sideBar">
          
                {categoryData.map(category => (
             <button onClick ={() => handleClick (category.id)} key={category.id}> {category.type} </button>
    
                ))}
           
        </div>
    );
    };
    

export default SideNav;