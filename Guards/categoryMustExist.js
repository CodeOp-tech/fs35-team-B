const db = require("../model/helper");

async function categoryMustExist(req, res, next) {
    try {
        const result = await db(
            `SELECT * FROM categories WHERE id = ${req.params.id}`
        );

        if (result.data.length) {
            req.category = result.data[0];
            next();
        } else {
            res.status(404).send({ message: "Category does not exist" });
        }
    } catch (err) {
        res.status(500).send(err);  
    }
}

module.exports = categoryMustExist;