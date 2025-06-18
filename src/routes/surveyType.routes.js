module.exports = app => {
  const { protect } = require("../middleware/authMiddleware.js");
  const surveyTypes = require("../controllers/surveyType.controller.js");

  var router = require("express").Router();

  // Create a new surveyType
  router.post("/", protect, surveyTypes.create);

  // Retrieve all protect, surveyTypes
  router.get("/", protect, surveyTypes.findAll);

  // Retrieve a single surveyType with id
  router.get("/:id", protect, surveyTypes.findOne);

  // Update a surveyType with id
  router.put("/:id", protect, surveyTypes.update);

  // Delete a surveyType with id
  router.delete("/:id", protect, surveyTypes.delete);

  // Retrieve all surveys of surveyType with id
  router.get("/:id/surveys", protect, surveyTypes.findSurveys);

  app.use('/api/surveyTypes', router);
};