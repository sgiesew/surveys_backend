module.exports = app => {
  const { protect } = require("../middleware/authMiddleware.js");
  const surveys = require("../controllers/survey.controller.js");

  var router = require("express").Router();

  // Create a new survey
  router.post("/", protect, surveys.create);

  // Retrieve all surveys
  router.get("/", protect, surveys.findAll);

  // Retrieve a single survey with id
  router.get("/:id", protect, surveys.findOne);

  // Update a survey with id
  router.put("/:id", protect, surveys.update);

  // Delete a survey with id
  router.delete("/:id", protect, surveys.delete);

  app.use('/api/surveys', router);
};