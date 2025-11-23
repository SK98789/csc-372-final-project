"use strict";
const courseController = require('../controllers/courseController');
const express = require("express");
const router = express.Router();
router.get("/:id", courseController.getCoursesFromUserId);
router.post("/", courseController.createCourse);
module.exports = router;