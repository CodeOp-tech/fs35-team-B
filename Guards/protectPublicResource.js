const db = require("../model/helper");

function guardgenerator(type) {async function protectPublicResource(req, res, next) {
    try {
        const result = await db(
            `SELECT * FROM ${type} WHERE id = ${req.params.id}`
        );

        if (result.data[0].user_id === 0) {
            res.status(405).send({ message: "Can't delete public resource" });
            // next();
        } else {
            next();
        }
    } catch (err) {
        res.status(500).send(err);  
    }
}
return protectPublicResource
} 

module.exports = guardgenerator;
