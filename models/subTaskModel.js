const pool = require('./db');
async function addSubTask(name, taskId) {
    let queryText = "INSERT INTO subtasks ( sub_task_name, task_id, still_active) VALUES ($1, $2, true) RETURNING *";
    let values = [name, taskId];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}

async function markSubTaskComplete(id){
    let queryText = "UPDATE subtasks SET still_active = false WHERE id = $1 ;";
    const values = [id];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}

async function getSubTasksFromId(taskId){
    let queryText = "SELECT * FROM subtasks where task_id =$1; ";
    const values = [taskId];
    const result = await pool.query(queryText, values);
    return result.rows;
}

async function deleteSubTask(id) {
    let queryText = "DELETE FROM subtasks WHERE id =$1; ";
    const values = [id];
    const result = await pool.query(queryText, values);
    return result.rowCount;
}

async function deleteAllSubTasksByTask(id) {
    let queryText = "DELETE FROM subtasks WHERE task_id =$1; ";
    const values = [id];
    const result = await pool.query(queryText, values);
    return result.rowCount;
}


module.exports = {
    addSubTask,
    markSubTaskComplete,
    getSubTasksFromId,
    deleteSubTask,
    deleteAllSubTasksByTask
    
};