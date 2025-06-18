module.exports = app => {
  const { protect } = require("../middleware/authMiddleware.js");
  const surveyTypeStatus = require("../controllers/surveyTypeStatus.controller.js");

  var router = require("express").Router();

  // Create a new surveyTypeStatus
  router.post("/", protect, surveyTypeStatus.create);

  // Retrieve all surveyTypeStatus
  router.get("/", protect, surveyTypeStatus.findAll);

  // Retrieve a single surveyTypeStatus with id
  router.get("/:id", protect, surveyTypeStatus.findOne);

  // Update a surveyTypeStatus with id
  router.put("/:id", protect, surveyTypeStatus.update);

  // Delete a surveyTypeStatus with id
  router.delete("/:id", protect, surveyTypeStatus.delete);

  app.use('/api/surveyTypeStatus', router);
};