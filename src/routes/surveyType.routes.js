module.exports = app => {
  const surveyTypes = require("../controllers/surveyType.controller.js");

  var router = require("express").Router();

  // Create a new survey
  router.post("/", surveyTypes.create);

  // Retrieve all surveyTypes
  router.get("/", surveyTypes.findAll);

  // Retrieve a single survey with id
  router.get("/:id", surveyTypes.findOne);

  // Delete a survey with id
  router.delete("/:id", surveyTypes.delete);

  app.use('/api/surveyTypes', router);
};