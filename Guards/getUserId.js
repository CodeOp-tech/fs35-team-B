var jwt = require("jsonwebtoken");
require("dotenv").config();
const supersecret = process.env.SUPER_SECRET;

function getUserId(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader ? authHeader.replace(/^Bearer\s/, "") : null;

  if (!token) {
    req.user_id = 0;
    next();
  } else {
    jwt.verify(token, supersecret, function (err, decoded) {
      if (err) {
        res.status(401).send({ message: err.message });
      } else {
        // Everything is awesome
        req.user_id = decoded.user_id;
        next();
      }
    });
  }
}

module.exports = getUserId;
