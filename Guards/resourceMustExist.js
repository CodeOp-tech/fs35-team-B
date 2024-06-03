const db = require("../model/helper");

async function resourceMustExist(req, res, next) {
    try {
        const result = await db(
            `SELECT * FROM resources WHERE id = ${req.params.id}`
        );

        if (result.data.length) {
            req.resource = result.data[0];
            next();
        } else {
            res.status(404).send({ message: "Resource does not exist" });
        }
    } catch (err) {
        res.status(500).send(err);  
    }
}

module.exports = resourceMustExist;