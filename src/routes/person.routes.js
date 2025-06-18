module.exports = app => {
  const { protect } = require("../middleware/authMiddleware.js");
  const person = require("../controllers/person.controller.js");

  var router = require("express").Router();

  // Create a new person
  router.post("/", protect, person.create);

  // Login a person
  router.post("/login", person.login);

  // Retrieve all people
  router.get("/", protect, person.findAll);

  // Retrieve a single person with id
  router.get("/:id", protect, person.findOne);

  // Update a person with id
  router.put("/:id", protect, person.update);

  // Delete a person with id
  router.delete("/:id", protect, person.delete);

  app.use('/api/people', router);
};