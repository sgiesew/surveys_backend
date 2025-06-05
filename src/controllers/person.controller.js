const db = require("../models");
const Person = db.persons;

exports.create = (req, res) => {
  Person.create(req.body)
    .then(data => {
      res.status(201).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the person."
      });
    });
};

exports.findAll = (req, res) => {
  Person.findAll({ include: [{ model: db.roles, as: "role"}] })
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

  Person.update(req.body, {
      where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "person was updated successfully!"
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