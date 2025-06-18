const jwt = require("jsonwebtoken");
const db = require("../models");
const Person = db.persons;

exports.protect = (req, res, next) => {
  var token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ){
    token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    Person.findByPk(decoded.id, { include: [{ model: db.roles, as: "role"}] })
      .then(person => {
        if (person) {
          req.user = person;
          next();
        }
        else {
          res.status(401).send({
            message: "Not authorized"
          });
        }
      })
      .catch(err => {
        res.status(401).send({
          message: "Not authorized"
        });
      });
  }
  else {
    res.status(401).send({
      message: "Not Authorized, no token"
    });
  }
};