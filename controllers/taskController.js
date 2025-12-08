"use strict";
const model = require('../models/taskModel');
async function getTasksFromId(req, res) {
    const id = req.params.id;
    if (id) {
        try {
            const tasks = await model.getTasksFromId(id);
            res.json(tasks);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing required id param!");
    }   
}

async function createTask(req, res) {
    const {taskTitle, courseId, taskDate, taskType, taskDesc} = req.body; 
    if (taskTitle && courseId && taskDate && taskType && taskDesc) {
        try {
            const newCourse = await model.addTask(taskTitle, courseId, taskDate, taskType, taskDesc)
            res.status(201).json(newCourse);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing required fields!");
    }
}

async function deleteTaskById(req, res) {
    const id = req.params.id;
    if (id) {
        try {
            const tasks = await model.deleteTask(id);
            res.json(tasks);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing required id param!");
    } 
    
}

module.exports = {
    getTasksFromId,
    createTask,
    deleteTaskById
};