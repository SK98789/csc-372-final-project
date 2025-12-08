"use strict";
const express = require("express");
const router = express.Router();
const taskController = require('../controllers/taskController');
router.post("/", taskController.createTask);
router.get("/:id", taskController.getTasksFromId);
router.delete("/:id", taskController.deleteTaskById);
//router.get("/:id/courseid/:courseId", courseController.getCourseFromUserAndCourseId)
//router.post("/", courseController.createCourse);
module.exports = router;