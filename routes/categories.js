var express = require('express');
var router = express.Router();
const db = require("../model/helper");
const categoryMustExist = require("../Guards/categoryMustExist");
const getUserId = require ("../Guards/getUserId");
const userMustBeLoggedIn = require("../Guards/userMustBeLoggedIn");
const protectPublicResource = require("../Guards/protectPublicResource");


const selectCategories = "SELECT * FROM categories";

// select * from categories where user_id = 3 

router.get("/", getUserId, async function(req, res) {
    try {
        // query is mutable, depending on the users status 
        let query;
        // If user is authenticated, fetch their categories and public categories
        if (req.user_id !== undefined) {
            query = `${selectCategories} WHERE (user_id = ${req.user_id} OR user_id = 0)`;
            console.log(query)
        } else {
            // If user is not authenticated, fetch only public categories
            query = `${selectCategories} WHERE user_id = 0`;
        }

        const result = await db(query);
        res.send(result.data);
    } catch (err) {
        res.status(500).send(err);
    }
});



// const selectCategories = "SELECT * FROM categories";

// router.get("/",getUserId, async function(req,res) {
//     // string as categories are string
//     const whereClause = [];
//     if (req.user_id !== undefined) {
//       // if there is user id include resources created by user
//         whereClause= `WHERE (user_id = ${req.user_id} OR user_id = 0) `;
//     } else {
//       // if user is not authenticated,include public resources 
//       // select * categories where user_id = 0
//       whereClause =  `WHERE user_id = 0`;
//     }
 
//     const query = `${selectCategories} ${whereClause}`;
//     console.log("query", query )

// try {
//     const result = await db(`${selectCategories} ${whereClause}`);
//     res.send(result.data);
// } catch (err) {
//     res.status(500).send(err);
// }
// });




// GET * FROM categories WHERE user_id = req.user_id

router.get("/:id", [getUserId, categoryMustExist], async (req, res) => {

    try {
        const categoryQuery = `SELECT * FROM categories WHERE id = ${req.params.id};`;

        const result = await db (categoryQuery);
        
            res.status(200).send(result.data);
        } catch (err) {
            res.status(500).send(err);
        }

});



// POST INTO categories VALUES (…)

router.post ("/",getUserId, async function (req, res) {

    try {
        let {type} = req.body;
        const user_id = req.user_id
        const addCategories = `INSERT INTO categories (type, user_id) VALUES ("${type}", ${user_id});`;
        await db (addCategories);


        // Fetch the updated list of categories to send back
        let query;
        if (user_id !== undefined) {
            query = `${selectCategories} WHERE (user_id = ${req.user_id} OR user_id = 0)`;
        } else {
            query = `${selectCategories} WHERE user_id = 0`;
        }

        const result = await db (query);

        res.status(200).send(result.data);
    } catch (err) {
        res.status(500).send(err);

        // console.log(err);
    }


});


router.delete("/:id", [userMustBeLoggedIn, protectPublicResource("categories") ,categoryMustExist], async function(req, res) {
    const categoryId = req.params.id;    
    const checkResources = `SELECT COUNT(*) as count FROM resources WHERE category_id=${categoryId};`;
    const removeResource = `DELETE FROM resources WHERE category_id=${categoryId};`;
    const removeCategory = `DELETE FROM categories WHERE id=${categoryId};`;    
    try {
        const resourceCheckResult = await db(checkResources);        
        if (resourceCheckResult.data[0].count > 0) {                 
            await db(removeResource);
        }  
        await db(removeCategory);    
        const result = await db(select);
        res.send(result.data);
    } catch (err) {
        res.status(500).send(err);
    }
});



module.exports = router;