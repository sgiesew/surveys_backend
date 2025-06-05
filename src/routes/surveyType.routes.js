module.exports = app => {
  const surveyTypes = require("../controllers/surveyType.controller.js");

  var router = require("express").Router();

  // Create a new surveyType
  router.post("/", surveyTypes.create);

  // Retrieve all surveyTypes
  router.get("/", surveyTypes.findAll);

  // Retrieve a single surveyType with id
  router.get("/:id", surveyTypes.findOne);

  // Update a surveyType with id
  router.put("/:id", surveyTypes.update);

  // Delete a surveyType with id
  router.delete("/:id", surveyTypes.delete);

  // Retrieve all surveys of surveyType with id
  router.get("/:id/surveys", surveyTypes.findSurveys);

  app.use('/api/surveyTypes', router);
};