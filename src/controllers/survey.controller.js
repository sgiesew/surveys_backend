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
    surveyTypeId: req.body.surveyTypeId,
    num_tasks: req.body.num_tasks,
    current_task: 0,
    num_completed: 0,
    completed: false
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
  Survey.findAll({ include: [{ model: db.surveyTypes, as: "surveyType"}] })
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

  Survey.findByPk(id, { include: [
    { model: db.tasks, as: "tasks", order: [ ["number", "ASC"] ], separate: true},
    { model: db.surveyTypes, as: "surveyType", include: [{ model: db.statements, as: "statements"}]}
    ], nest: true })
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
        message: "Error retrieving Survey with id=" + id + " -> " + err.message
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Survey.update(req.body, {
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