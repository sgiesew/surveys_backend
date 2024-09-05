const db = require("../models");
const SurveyType = db.surveyTypes;

exports.create = (req, res) => {
  const surveyType = {
    name: req.body.name
  };

  SurveyType.create(surveyType)
    .then(data => {
      res.status(201).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the SurveyType."
      });
    });
};

exports.findAll = (req, res) => {
  SurveyType.findAll({ include: ["statements"] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving surveyTypes."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  SurveyType.findByPk(id, { include: ["statements"] })
    .then(data => {
      if (data) {
        res.send(data);
      }
      else {
        res.status(404).send({
          message: `Cannot find SurveyType with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving SurveyType with id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  SurveyType.update(req.body, {
      where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "SurveyType was updated successfully!"
        });
      }
      else {
        res.status(404).send({
          message: `Cannot update SurveyType with id=${id}. Maybe SurveyType was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not update SurveyType with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  SurveyType.destroy({
      where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "SurveyType was deleted successfully!"
        });
      }
      else {
        res.status(404).send({
          message: `Cannot delete SurveyType with id=${id}. Maybe SurveyType was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete SurveyType with id=" + id
      });
    });
};