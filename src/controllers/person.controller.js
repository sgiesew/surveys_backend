const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../models");
const Person = db.persons;

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

exports.create = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).send({
      message: "Username and password must be specified!"
    });
    return;
  }

  bcrypt.genSalt(10)
    .then(salt => {
      bcrypt.hash(password, salt)
        .then(hashedPassword => {
          req.body.password = hashedPassword;
          Person.create(req.body)
            .then(person => {
              res.status(201).json({
                id: person.id,
                username: person.username,
                password: person.password,
                token: generateToken(person.id),
              });
            })
            .catch(err => {
              res.status(500).send({
                message:
                  err.message || "Some error occurred while creating the person."
              });
            });
        })
    })

};

exports.login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).send({
      message: "Username and password must be specified!"
    });
    return;
  }

  Person.findOne({ where: { username: username }, include: [{ model: db.roles, as: "role"}] })
    .then(person => {
      if (person){
        bcrypt.compare(password, person.password)
          .then(is_match => {
            if (is_match){
              res.json({
                id: person.id,
                username: person.username,
                roleId: person.roleId,
                role: person.role,
                token: generateToken(person.id),
              });
            }
            else {
              res.status(401).send({
                message: "Invalid credentials"
              });
            }
          })
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving person."
      });
    });

};

exports.findAll = (req, res) => {
  Person.findAll({ include: [{ model: db.roles, as: "role"}], order: [ ["lastName", "ASC"] ] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving person."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Person.findByPk(id, { include: [{ model: db.roles, as: "role"}] })
    .then(data => {
      if (data) {
        res.send(data);
      }
      else {
        res.status(404).send({
          message: `Cannot find person with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving person with id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  if (!req.body.password){
    const person = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      roleId: req.body.roleId
    }
    Person.update(person, {
        where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Person was updated successfully without password!"
          });
        }
        else {
          res.status(404).send({
            message: `Cannot update person with id=${id}. Maybe person was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not update person with id=" + id
        });
      });
    }
    else {
      bcrypt.genSalt(10)
        .then(salt => {
          bcrypt.hash(req.body.password, salt)
            .then(hashedPassword => {
              req.body.password = hashedPassword;
              const person = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.username,
                password: req.body.password,
                roleId: req.body.roleId
              }
              Person.update(person, {
                  where: { id: id }
              })
                .then(num => {
                  if (num == 1) {
                    res.send({
                      message: "Person was updated successfully with password!"
                    });
                  }
                  else {
                    res.status(404).send({
                      message: `Cannot update person with id=${id}. Maybe person was not found!`
                    });
                  }
                })
                .catch(err => {
                  res.status(500).send({
                    message: "Could not update person with id=" + id
                  });
                });
            })
        })
    }
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Person.destroy({
      where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "person was deleted successfully!"
        });
      }
      else {
        res.status(404).send({
          message: `Cannot delete person with id=${id}. Maybe person was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete person with id=" + id
      });
    });
};