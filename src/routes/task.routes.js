module.exports = app => {
  const { protect } = require("../middleware/authMiddleware.js");
  const tasks = require("../controllers/task.controller.js");

  var router = require("express").Router();

  // Create a new task
  router.post("/", protect, tasks.create);

  // Retrieve all tasks
  router.get("/", protect, tasks.findAll);

  // Retrieve a single task with id
  router.get("/:id", protect, tasks.findOne);

  // Update a task with id
  router.put("/:id", protect, tasks.update);

  // Delete a task with id
  router.delete("/:id", protect, tasks.delete);

  app.use('/api/tasks', router);
};