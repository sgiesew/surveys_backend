const db = require("../models");
const surveyTypeStatus = db.surveyTypeStatus;

exports.create = (req, res) => {
  surveyTypeStatus.create(req.body)
    .then(data => {
      res.status(201).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the surveyTypeStatus."
      });
    });
};

exports.findAll = (req, res) => {
  surveyTypeStatus.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving surveyTypeStatus."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  surveyTypeStatus.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      }
      else {
        res.status(404).send({
          message: `Cannot find surveyTypeStatus with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving surveyTypeStatus with id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  surveyTypeStatus.update(req.body, {
      where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "surveyTypeStatus was updated successfully!"
        });
      }
      else {
        res.status(404).send({
          message: `Cannot update surveyTypeStatus with id=${id}. Maybe surveyTypeStatus was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not update surveyTypeStatus with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  surveyTypeStatus.destroy({
      where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "surveyTypeStatus was deleted successfully!"
        });
      }
      else {
        res.status(404).send({
          message: `Cannot delete surveyTypeStatus with id=${id}. Maybe surveyTypeStatus was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete surveyTypeStatus with id=" + id
      });
    });
};