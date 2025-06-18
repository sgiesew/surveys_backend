const Sequelize = require("sequelize");
const db = require("../models");
const { QueryTypes } = require('sequelize');
const { Op } = require('sequelize');
const SurveyType = db.surveyTypes;
const Statement = db.statements;
const Survey = db.surveys;
const Task = db.tasks;

exports.create = (req, res) => {
  const surveyType = {
    name: req.body.name,
    surveyTypeStatusId: 1,
    num_surveys: 0,
    num_completed: 0,
    statements: req.body.statements
  };

  SurveyType.create(surveyType)
    .then(data => {
      surveyType.statements.forEach( (statement, index) => {
        statement.surveyTypeId = data.id;
        Statement.create(statement)
        .then(data => {

        })
        .catch(err => {
          res.status(500).send({
            message:
              "Some error occurred while creating the Statement."
          });
          return;
        });
      });
      res.status(201).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          "Some error occurred while creating the SurveyType."
      });
    });
};

exports.findAll = (req, res) => {
  var args = {
    attributes: { 
      include: [
        [Sequelize.fn("COUNT", Sequelize.col("statements.id")), "statementsCount"]
      ] 
    },
    include: [
      { model: db.surveyTypeStatus, as: "surveyTypeStatus"},
      { model: db.persons, as: "person"},
      { model: db.statements, as: "statements", attributes:[]}
    ],
    order: [ ["name", "ASC"] ],
    group: ["surveyType.id", "surveyTypeStatus.id", "person.id"]
  };
  if (req.user.role.usid === "Supervisor"){
    args.where = { personId: req.user.id };
  }
  SurveyType.findAll(args)
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

  SurveyType.findByPk(id, { include: [{ model: db.statements, as: "statements", order: [ ["number", "ASC"] ], separate: true}] })
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
        if (req.body.statements){
          Statement.findAll( {where: { surveyTypeId: id } })
          .then(saved_statements => {
            saved_statements.forEach( (saved_statement, index) => {
              var found_in_updated_statements = false;
              req.body.statements.forEach( (statement, index) => {
                if (saved_statement.id === statement.id){
                  Statement.update(statement, {
                    where: { id: saved_statement.id }
                  })
                  .then(num => {
                    if (num != 1) {
                      res.status(404).send({
                        message: `Cannot update Statement with id=${id}. Maybe Statement was not found!`
                      });
                      return;
                    }
                  })
                  .catch(err => {
                    res.status(500).send({
                      message: "Could not update Statement with id=" + id
                    });
                    return;
                  });
                  found_in_updated_statements = true;
                }
              });
              if (!found_in_updated_statements){
                Statement.destroy({
                  where: { id: saved_statement.id }
                })
                .then(num => {
                  if (num != 1) {
                    res.status(404).send({
                      message: `Cannot delete Statement with id=${id}. Maybe Statement was not found!`
                    });
                    return;
                  }
                })
                .catch(err => {
                  res.status(500).send({
                    message: "Could not delete Statement with id=" + id
                  });
                  return;
                });
              }
            });
          })
          .catch(err => {
            res.status(500).send({
              message: `Cannot update SurveyType with id=${id}. Some error occurred while retrieving statements`
            });
            return;
          });

          req.body.statements.forEach( (statement, index) => {
            if (!statement.id){
              Statement.create(statement)
              .then(data => {

              })
              .catch(err => {
                res.status(500).send({
                  message:
                    err.message || "Some error occurred while creating the Statement."
                });
                return;
              });
            }
          });
        }
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
  var surveyIds = [];

  Statement.destroy({
      where: { surveyTypeId: id }
  })
    .then(num => {
      if (num > 0) {
        Survey.findAll({
            where: { surveyTypeId: id }
        })
          .then(surveys => {
            surveyIds = surveys.map( survey => survey.id);
            if (surveyIds.length > 0){
              Task.destroy({
                where: {
                  surveyId: {
                    [Op.or]: surveyIds,
                  },
                },
              });
            }

            Survey.destroy({
                where: { surveyTypeId: id }
            })
            .catch(err => {
              res.status(500).send({
                message: "Could not delete surveys of SurveyType with id=" + id
              });
            });

            SurveyType.destroy({
                where: { id: id }
            })
              .then(num => {
                if (num == 1) {
                  res.send({
                    message: "SurveyType, Statements & Tasks were deleted successfully!"
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

          })

      }
      else {
        res.status(404).send({
          message: `Cannot delete statements of SurveyType with id=${id}. Maybe SurveyType was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete statements of SurveyType with id=" + id
      });
    });
};

exports.findSurveys = (req, res) => {
  const id = req.params.id;

  Survey.findAll({
    include: [
        { model: db.tasks, as: "tasks", order: [ ["number", "ASC"] ], separate: true},
      ],
    where: { surveyTypeId: id }
  })
    .then(data => {
      if (data) {
        res.send(data);
      }
      else {
        res.status(404).send({
          message: `Cannot find surveys of SurveyType with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving surveys of SurveyType with id=" + id
      });
    });
};
