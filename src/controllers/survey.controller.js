const db = require("../models");
const Survey = db.surveys;
const Task = db.tasks;


exports.create = (req, res) => {
  if (!req.body.surveyTypeId) {
    res.status(400).send({
      message: "The surveyTypeId must be specified!"
    });
    return;
  }

  const survey = {
    surveyTypeId: req.body.surveyTypeId,
    personId: req.body.personId,
    num_tasks: req.body.num_tasks,
    current_task: 0,
    num_completed: 0,
    completed: false
  };

  Survey.create(survey)
    .then(data => {
      for (let i = 0; i < req.body.num_tasks; i++) {
        const task = {
          number: i,
          response: 0,
          surveyId: data.id
        };
        Task.create(task)
          .then(data => {

          })
          .catch(err => {
            res.status(500).send({
              message:
                "Some error occurred while creating the Task."
            });
            return;
          });
      }
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
        req.body.tasks.forEach( task => {
          Task.update(task, {
            where: { id: task.id }
          })
          .then(num => {
            if (num != 1) {
              res.status(404).send({
                message: `Cannot update Survey with id=${id}. Task with id=${task.id} not found!`
              });
              return;
            }
          })
          .catch(err => {
            res.status(500).send({
              message: `Could not update Survey with id=${id}. Problem with task id=${task.id}.`
            });
            return;
          });
        });
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

  Task.destroy({
      where: { surveyId: id }
  })
    .then(num => {
      if (num > 0) {
        Survey.destroy({
            where: { id: id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "Survey & Tasks were deleted successfully!"
              });
            }
            else {
              res.status(404).send({
                message: `Cannot delete Survey with id=${id}. Maybe SurveyType was not found!`
              });
            }
          })
        .catch(err => {
          res.status(500).send({
            message: "Could not delete Survey with id=" + id
          });
        });
      }
      else {
        res.status(404).send({
          message: `Cannot delete tasks of Survey with id=${id}. Maybe SurveyType was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete tasks of Survey with id=" + id
      });
    });

};