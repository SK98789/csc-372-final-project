const pool = require('./db');
async function addTask(name, courseId, dueDate, taskType, description) {
    let queryText = "INSERT INTO tasks ( task_name, course_id, due_date, task_type, description, still_active) VALUES ($1, $2, $3, $4, $5, true) RETURNING *";
    let values = [name, courseId, dueDate, taskType, description];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}

async function getTasksFromId(courseId){
    let queryText = "SELECT * FROM tasks where course_id =$1; ";
    const values = [courseId];
    const result = await pool.query(queryText, values);
    return result.rows;
}

async function deleteTask(id) {
    let queryText = "DELETE FROM tasks WHERE id =$1; ";
    const values = [id];
    const result = await pool.query(queryText, values);
    return result.rowCount;
}

async function updateTaskIsActive(id, isStillActive){
    let queryText = "UPDATE tasks SET still_active = $1 WHERE id = $2 ;";
    const values = [isStillActive, id];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}

module.exports = {
    addTask,
    getTasksFromId,
    deleteTask,
    updateTaskIsActive
};