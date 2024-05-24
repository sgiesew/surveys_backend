module.exports = app => {
  const surveys = require("../controllers/survey.controller.js");

  var router = require("express").Router();

  // Create a new survey
  router.post("/", surveys.create);

  // Retrieve all surveys
  router.get("/", surveys.findAll);

  // Retrieve a single survey with id
  router.get("/:id", surveys.findOne);

  // Update a survey with id
  router.put("/:id", surveys.update);

  // Delete a survey with id
  router.delete("/:id", surveys.delete);

  app.use('/api/surveys', router);
};