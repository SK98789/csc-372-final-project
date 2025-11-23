"use strict";
const model = require('../models/courseModel');
async function getCoursesFromUserId(req, res) {
    const id = req.params.id;
    try {
        const courses = await model.getCoursesFromUserId(id);
        res.json(courses);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }   
}

async function createCourse(req, res) {
    const { user_google_id, course_name } = req.body; 
    console.log(req.body);
    if (user_google_id && course_name) {
        try {
            const newCourse = await model.addCourse(user_google_id, course_name);
            res.status(201).json(newCourse);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing required fields!");
    }
}

module.exports = {
    getCoursesFromUserId,
    createCourse
};