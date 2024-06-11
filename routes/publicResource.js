var express = require('express');
var router = express.Router();
const db = require("../model/helper");
const resourceMustExist = require('../Guards/resourceMustExist');

/* const userMustBeLoggedIn = require(`../Guards/userMustbeLoggedIn`) */

const select = "SELECT * FROM resources;";


//Get all resources
router.get("/", async function(req,res) {
    try {
        const result = await db(select);
        res.send(result.data);
    } catch (err) {
        res.status(500).send(err);
    }
    });

// Get resources by id (where user_id=0)
router.get("/:id", resourceMustExist, /* userMustBeLoggedIn, */ async function(req,res) {
    const idQuery = `SELECT * FROM resources WHERE id=${req.params.id};`;
       try {
        const result = await db(idQuery);
        const resource = result.data[0];
        const category = await db(`SELECT * FROM categories WHERE id=${resource.category_id};`);
        res.send(resource);
    }catch(err){
        res.status(500).send(err);
    }
});


module.exports = router;