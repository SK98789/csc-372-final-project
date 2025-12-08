"use strict";
const subTaskController = require('../controllers/subTaskController');
const express = require("express");
const router = express.Router();
//router.get("/:id", courseController.getCoursesFromUserId);
//router.get("/:id/courseid/:courseId", courseController.getCourseFromUserAndCourseId)
router.post("/", subTaskController.createSubTask);
module.exports = router;