const express = require("express");
const router = express.Router();
const controller = require("../../app/providers/controllerProvider");
const passport = require("passport");

//Retreive Tasks
router.get("/getall", (req, res) => {
  return controller.taskController.getAll(req, res);
});
//retreive By id
router.get("/get", (req, res) => {
  return controller.taskController.getTask(req, res);
});
//Save new Task
router.post("/add", (req, res) => {
  return controller.taskController.addTask(req, res);
});

//Edit Task
router.put("/edit", (req, res) => {
  return controller.taskController.editTask(req, res);
});

//Delete Task
router.delete("/delete", (req, res) => {
  return controller.taskController.deleteTask(req, res);
});


module.exports = router;
