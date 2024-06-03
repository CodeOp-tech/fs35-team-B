var express = require('express');
var router = express.Router();
const db = require("../model/helper");


// GET * FROM categories WHERE user_id = req.user_id

router.get("/:id", async (req, res) => {

    try {
        const categoryQuery = `SELECT * FROM videos WHERE id = ${req.params.id};`;

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



module.exports = router;