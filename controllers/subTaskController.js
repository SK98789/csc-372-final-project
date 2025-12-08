"use strict";
const model = require('../models/subTaskModel');
async function createSubTask(req, res) {
    const {sub_task_name, task_id} = req.body; 
    if (sub_task_name && task_id) {
        try {
            const newSubTask = await model.addSubTask(sub_task_name, task_id);
            res.status(201).json(newSubTask);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing required fields!");
    }
}

module.exports = {
    createSubTask
};