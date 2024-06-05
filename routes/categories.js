var express = require('express');
var router = express.Router();
const db = require("../model/helper");
const categoryMustExist = require("../Guards/categoryMustExist")

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

router.get("/:id",categoryMustExist, async (req, res) => {

    try {
        const categoryQuery = `SELECT * FROM categories WHERE id = ${req.params.id};`;

        const result = await db (categoryQuery);
        
            res.status(200).send(result.data);
        } catch (err) {
            res.status(500).send(err);
        }

});

// POST INTO categories VALUES (…)

router.post ("/", async function (req, res) {

    try {
        const {type, user_id} = req.body;
        const addCategories = `INSERT INTO categories (type, user_id) VALUES ("${type}", ${0});`;
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