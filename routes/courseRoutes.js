"use strict";
const courseController = require('../controllers/courseController');
const express = require("express");
const router = express.Router();
router.get("/getquote", courseController.getQuote);
router.get("/:id", courseController.getCoursesFromUserId);
router.get("/:id/courseid/:courseId", courseController.getCourseFromUserAndCourseId)
router.post("/", courseController.createCourse);
router.delete("/:id", courseController.deleteCourseById);
module.exports = router;