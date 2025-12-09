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

async function getCourseFromUserAndCourseId(req, res) {
    const userId = req.params.id;
    const courseId = req.params.courseId;
    try {
        const course = await model.getCourseFromUserAndCourseId(id, courseId);
        res.json(course);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}

async function createCourse(req, res) {
    const { user_google_id, course_name } = req.body;
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

async function deleteCourseById(req, res) {
    const id = req.params.id;
    if (id) {
        try {
            const results = await model.deleteCourseById(id);
            res.json(results);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing required id param!");
    }

}
async function getQuote(req, res) {
    try {
        const params = {
            "method": "getQuote",
            "format": "json",
            "lang": "en"
        };
        const queryParams = new URLSearchParams(params);
        const baseUrl = "https://api.forismatic.com/api/1.0/";
        const apiUrl = `${baseUrl}?${queryParams.toString()}`;
        let results = await fetch(apiUrl);
        let data = await results.json();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}



module.exports = {
    getCoursesFromUserId,
    createCourse,
    getCourseFromUserAndCourseId,
    deleteCourseById,
    getQuote
};