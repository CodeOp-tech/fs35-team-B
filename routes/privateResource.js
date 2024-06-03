var express = require('express');
var router = express.Router();
const db = require("../model/helper");



const select = "SELECT * FROM resources;";

// GET resources by user_id (to be adjusted when LOGIN is created)
// FOR LATER: INSERT GUARD!

router.get("/", async function(req,res) {
try {
    const result = await db(select);
    res.send(result.data);
} catch (err) {
    res.status(500).send(err);
}
});

// GET resource by id
router.get("/:id", async function(req, res) {
    const idQuery = `SELECT FROM resources WHERE id=${req.params.id};`;
    try {
        const result = await db(idQuery);
        res.send(result.data[0]);
    }catch(err) {
        res.status(500).send(err);
    }
});

// INSERT into resources
router.post("/", async function(req,res) {
    const {link_url, vid_url, doc, img, notes, category_id, user_id} = req.body;
    const post = `INSERT INTO resources (link_url, vid_url, doc, img, notes, category_id, user_id) VALUES ('${link_url}', '${vid_url}', '${doc}', '${img}', '${notes}', ${category_id}, ${user_id});`;
    try {
        await db(post);
        const result = await db(select);
        res.send(result.data);
    }catch(err) {
        res.status(500).send(err);
    }
});


router.delete("/:id", async function(req, res) {
    const remove = `DELETE FROM resources WHERE id=${req.params.id};`;
    try{
        await db(remove);
        const result = await db(select);
        res.send(result.data);
    }catch(err){
        res.status(500).send(err);
    }
});

module.exports = router;