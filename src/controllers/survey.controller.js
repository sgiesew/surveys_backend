const db = require("../models");
const Survey = db.surveys;

exports.create = (req, res) => {
  if (!req.body.surveyTypeId) {
    res.status(400).send({
      message: "The surveyTypeId must be specified!"
    });
    return;
  }

  const survey = {
    num_completed: 0
  };

  Survey.create(survey)
    .then(data => {
      res.status(201).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Survey."
      });
    });
};

exports.findAll = (req, res) => {
  Survey.findAll({ include: ["tasks"] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving surveys."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Survey.findByPk(id, { include: ["tasks"] })
    .then(data => {
      if (data) {
        res.send(data);
      }
      else {
        res.status(404).send({
          message: `Cannot find Survey with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Survey with id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Survey.update({
      where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Survey was updated successfully!"
        });
      }
      else {
        res.status(404).send({
          message: `Cannot update Survey with id=${id}. Maybe Survey was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not update Survey with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Survey.destroy({
      where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Survey was deleted successfully!"
        });
      }
      else {
        res.status(404).send({
          message: `Cannot delete Survey with id=${id}. Maybe Survey was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Survey with id=" + id
      });
    });
};