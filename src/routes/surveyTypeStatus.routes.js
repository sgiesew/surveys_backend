module.exports = app => {
    const surveyTypeStatus = require("../controllers/surveyTypeStatus.controller.js");
  
    var router = require("express").Router();
  
    // Create a new surveyTypeStatus
    router.post("/", surveyTypeStatus.create);
  
    // Retrieve all surveyTypeStatus
    router.get("/", surveyTypeStatus.findAll);
  
    // Retrieve a single surveyTypeStatus with id
    router.get("/:id", surveyTypeStatus.findOne);
  
    // Update a surveyTypeStatus with id
    router.put("/:id", surveyTypeStatus.update);
  
    // Delete a surveyTypeStatus with id
    router.delete("/:id", surveyTypeStatus.delete);
  
    app.use('/api/surveyTypeStatus', router);
  };