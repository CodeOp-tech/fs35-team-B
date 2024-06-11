var express = require('express');
var router = express.Router();
const db = require("../model/helper");
const categoryMustExist = require("../Guards/categoryMustExist");
const getUserId = require ("../Guards/getUserId");
const userMustBeLoggedIn = require("../Guards/userMustBeLoggedIn");
const protectPublicResource = require("../Guards/protectPublicResource");


const select = "SELECT * FROM categories ";

router.get("/", getUserId, async function(req,res) {
const where = [];
    if (req.user_id !== undefined) {
      // if there is user id include resources created by user
        where.push(`(user_id = ${req.user_id} OR user_id = 0) `);
    } else {
      // if user is not authenticated,include public resources 
      where.push(`user_id = 0`);
    }
    const whereClause = where.length ? `WHERE ${where.join(" AND ")}` : "";
    console.log(select + whereClause)
try {
    const result = await db(select + whereClause);
    res.send(result.data);
} catch (err) {
    res.status(500).send(err);
}
});


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

        const result = await db("SELECT * FROM categories;");

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
        const result = await db("SELECT * FROM categories;");
        res.send(result.data);
    } catch (err) {
        res.status(500).send(err);
    }
});



module.exports = router;