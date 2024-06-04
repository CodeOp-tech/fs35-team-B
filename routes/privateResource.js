var express = require('express');
var router = express.Router();
const db = require("../model/helper");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const resourceMustExist = require("../Guards/resourceMustExist");
const { v4: uuidv4 } = require("uuid");
const mime = require("mime-types");
const fs = require("fs/promises");
const path = require("path")


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
router.get("/:id",resourceMustExist, async function(req, res) {
    const idQuery = `SELECT * FROM resources WHERE id=${req.params.id};`;
    try {
        const result = await db(idQuery);
        res.send(result.data[0]);
    }catch(err) {
        res.status(500).send(err);
    }
});

// INSERT into resources
router.post("/", upload.fields([{name: "imagefile"},{name: "document"}]), async function(req,res) {
    const imagefile = req.files["imagefile"][0];
        const document = req.files["document"][0];
        const imgExtension = mime.extension(imagefile.mimetype);
        const docExtension = mime.extension(document.mimetype);
        const imgFileName = uuidv4() + "." + imgExtension;
        const docFileName = uuidv4() + "." + docExtension;
        const imgTempPath = imagefile.path;
        const docTempPath = document.path;
        const imgTargetPath = path.join(__dirname, "../uploads/", imgFileName);
        const docTargetPath = path.join(__dirname, "../uploads/", docFileName);
    const {link_url, vid_url, notes, category_id, user_id} = req.body;
    const post = `INSERT INTO resources (link_url, vid_url, doc, img, notes, category_id, user_id) VALUES ('${link_url}', '${vid_url}', '${document}', '${imagefile}', '${notes}', ${category_id}, ${user_id});`;
    try {
        await fs.rename(imgTempPath, imgTargetPath);
        await fs.rename(docTempPath, docTargetPath);
        await db(post);
        const result = await db(select);
        res.send(result.data);
    }catch(err) {
        res.status(500).send(err);
    }
});


router.delete("/:id", resourceMustExist, async function(req, res) {
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