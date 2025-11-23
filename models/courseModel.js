const pool = require('./db');
async function getCoursesFromUserId(googleId) {
    let queryText = "SELECT * FROM course where user_google_id =$1; ";
    const values = [googleId];
    const result = await pool.query(queryText, values);
    return result.rows;
}

async function addCourse(googleId, name) {
    let queryText = "INSERT INTO course ( user_google_id, course_name) VALUES ($1, $2) RETURNING *";
    let values = [googleId, name];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}

module.exports = {
    getCoursesFromUserId,
    addCourse
};