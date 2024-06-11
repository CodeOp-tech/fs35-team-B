var express = require('express');
var router = express.Router();
const db = require("../model/helper");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const resourceMustExist = require("../Guards/resourceMustExist");
const { v4: uuidv4 } = require("uuid");
const mime = require("mime-types");
const fs = require("fs/promises");
const path = require("path");
const getUserId = require("../Guards/getUserId");
const userMustBeLoggedIn = require("../Guards/userMustBeLoggedIn");
const protectPublicResource = require("../Guards/protectPublicResource");


const select = "SELECT * FROM resources "; 

router.get("/",getUserId, async function(req,res) {
    const where = [];
    if (req.query.category) {
        where.push(`category_id = ${req.query.category}`);    
    }
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

//by user id 
router.get("/:id", [getUserId, resourceMustExist], async function(req, res) {

    const idQuery = `SELECT * FROM resources WHERE id =${req.params.id};`;   
    try {
        const result = await db(idQuery);
        res.send(result);
    }catch(err) {
        res.status(500).send(err);
    }
});

// GET resource by category id and type
// router.get("/categories/:id",resourceMustExist, async function(req, res) {
//     const idQuery = `SELECT * FROM resources LEFT JOIN categories ON resources.category_id = categories.id WHERE categories.id =${req.params.id};`;
//     try {
//         const result = await db(idQuery);
//         const resource = result.data;
//         res.send(resource);
//     }catch(err) {
//         res.status(500).send(err);
//     }
// });

// SELECT * FROM resources
// LEFT JOIN categories
// ON resources.category_id = categories.id;

// INSERT into resources
router.post("/", getUserId, upload.fields([{ name: "imagefile" }, { name: "document" }]), async function (req, res) {
  let { link_url, vid_url, notes, category_id } = req.body;

  link_url = link_url || '';
  vid_url = vid_url || '';
  notes = notes || '';
  category_id = category_id || 0;
  const user_id = req.user_id

  let imgFileName = '';
  let docFileName = '';

  if (req.files["imagefile"]) {
    const imagefile = req.files["imagefile"][0];
    const imgExtension = mime.extension(imagefile.mimetype);
    imgFileName = uuidv4() + "." + imgExtension;
    const imgTempPath = imagefile.path;
    const imgTargetPath = path.join(__dirname, "../public/uploads/", imgFileName);

    try {
      await fs.rename(imgTempPath, imgTargetPath);
    } catch (err) {
      return res.status(500).send({ error: "Error processing image file", details: err });
    }
  }

  if (req.files["document"]) {
    const document = req.files["document"][0];
    const docExtension = mime.extension(document.mimetype);
    docFileName = uuidv4() + "." + docExtension;
    const docTempPath = document.path;
    const docTargetPath = path.join(__dirname, "../public/uploads/", docFileName);

    try {
      await fs.rename(docTempPath, docTargetPath);
    } catch (err) {
      return res.status(500).send({ error: "Error processing document file", details: err });
    }
  }

  const fields = ['link_url', 'vid_url', 'doc', 'img', 'notes', 'category_id', 'user_id'];
  const values = [`'${link_url}'`, `'${vid_url}'`, `'${docFileName}'`, `'${imgFileName}'`, `'${notes}'`, category_id, user_id];

  const fieldsString = fields.join(', ');
  const valuesString = values.join(', ');

  const post = `INSERT INTO resources (${fieldsString}) VALUES (${valuesString});`;

  try {
    await db(post);
    const result = await db('SELECT * FROM resources'); 
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});


router.delete("/:id", [userMustBeLoggedIn, protectPublicResource("resources"), resourceMustExist], async function(req, res) {
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