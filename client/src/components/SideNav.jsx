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
    
    const navigate = useNavigate ();

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
      {categories.map(category => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button onClick ={() => handleClick (category.id)} style={{ flex: 1 }} key={category.id}>{category.type}</button>
          <button key={category.id} onClick={() => deleteCategory(category.id)}>❌</button>
        </div>
    ))}
    </div>

    //   <div className="sideBar">
    //     {categories.map(category => (
    //       <div key={category.id} style={{ display: 'flex', alignItems: 'center' }}>
    //         <button onClick={() => handleClick(category.id)} style={{ flex: 1 }}>
    //           {category.type}
    //         </button>
    //         <button onClick={(e) => deleteCategory(category.id, e)}>❌</button>
    //       </div>
    //     ))}
    //   </div>
    // );

    );
  };
    
export default SideNav;