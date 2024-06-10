var express = require('express');
var router = express.Router();
const db = require("../model/helper");
const categoryMustExist = require("../Guards/categoryMustExist");
const getUserId = require ("../Guards/getUserId");


const select = "SELECT * FROM categories;";

router.get("/", async function(req,res) {
try {
    const result = await db(select);
    res.send(result.data);
} catch (err) {
    res.status(500).send(err);
}
});


// GET * FROM categories WHERE user_id = req.user_id

router.get("/:id", getUserId, categoryMustExist, async (req, res) => {

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

        const categoryList = "SELECT * FROM categories;" ;
        const result = await db (categoryList);

        res.status(200).send(result.data);
    } catch (err) {
        res.status(500).send(err);

        // console.log(err);
    }


});

router.delete("/:id",categoryMustExist, async function(req, res) {
    // const removeResources = `DELETE FROM resources WHERE category_id=${req.params.id};`;
    const remove = `DELETE FROM categories WHERE id=${req.params.id};`;
    try{
        await db(remove);
        const result = await db(select);
        res.send(result.data);
    }catch(err){
        res.status(500).send(err);
    }
});



module.exports = router;