const db = require("../models");
const Statement = db.statements;

exports.create = (req, res) => {
  if (!req.body.surveyTypeId) {
    res.status(400).send({
      message: "The surveyTypeId must be specified!"
    });
    return;
  }

  const statement = {
    number: req.body.number,
    text: req.body.text,
    surveyTypeId: req.body.surveyTypeId
  };

  Statement.create(statement)
    .then(data => {
      res.status(201).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Statement."
      });
    });
};

exports.findAll = (req, res) => {
  Statement.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving statements."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Statement.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      }
      else {
        res.status(404).send({
          message: `Cannot find Statement with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Statement with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Statement.destroy({
      where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Statement was deleted successfully!"
        });
      }
      else {
        res.status(404).send({
          message: `Cannot delete Statement with id=${id}. Maybe Statement was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Statement with id=" + id
      });
    });
};