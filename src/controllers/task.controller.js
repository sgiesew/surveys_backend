const db = require("../models");
const Task = db.tasks;

exports.create = (req, res) => {
  if (!req.body.question) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const task = {
    question: req.body.question,
    answer: req.body.answer
  };

  Task.create(task)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Task."
      });
    });
};

exports.findAll = (req, res) => {
  Task.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
          message:
          err.message || "Some error occurred while retrieving tasks."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Task.findByPk(id)
    .then(data => {
      if (data) {
          res.send(data);
      }
      else {
          res.status(404).send({
          message: `Cannot find Task with id=${id}.`
          });
      }
    })
    .catch(err => {
      res.status(500).send({
          message: "Error retrieving Tutorial with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Task.destroy({
      where: { id: id }
  })
    .then(num => {
      if (num == 1) {
          res.send({
          message: "Task was deleted successfully!"
          });
      }
      else {
          res.send({
          message: `Cannot delete Task with id=${id}. Maybe Task was not found!`
          });
      }
    })
    .catch(err => {
      res.status(500).send({
          message: "Could not delete Task with id=" + id
      });
    });
};