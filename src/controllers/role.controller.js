const db = require("../models");
const Role = db.roles;

exports.create = (req, res) => {
  Role.create(req.body)
    .then(data => {
      res.status(201).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the role."
      });
    });
};

exports.findAll = (req, res) => {
  Role.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving role."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Role.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      }
      else {
        res.status(404).send({
          message: `Cannot find role with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving role with id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Role.update(req.body, {
      where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "role was updated successfully!"
        });
      }
      else {
        res.status(404).send({
          message: `Cannot update role with id=${id}. Maybe role was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not update role with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Role.destroy({
      where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "role was deleted successfully!"
        });
      }
      else {
        res.status(404).send({
          message: `Cannot delete role with id=${id}. Maybe role was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete role with id=" + id
      });
    });
};