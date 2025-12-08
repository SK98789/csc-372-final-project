require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

// Create users table on startup if it doesn't exist
const createTables = async () => {
    const createUserTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            googleId VARCHAR(255) UNIQUE NOT NULL,
            displayName VARCHAR(255),
            firstName VARCHAR(255),
            lastName VARCHAR(255),
            email VARCHAR(255) UNIQUE NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    const createCourseTable = `
        CREATE TABLE IF NOT EXISTS course (
            id SERIAL PRIMARY KEY,
            user_google_id VARCHAR(255) NOT NULL,
            course_name VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT fk_user
                FOREIGN KEY(user_google_id)
                    REFERENCES users(googleId)
        );
    `;
    const createTaskTable = `
        CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        task_name VARCHAR(255) NOT NULL,
        course_id INTEGER NOT NULL,
        due_date TIMESTAMP,
        task_type VARCHAR(40),
        description VARCHAR(255),
        still_active BOOL NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_task
            FOREIGN KEY(course_id)
                REFERENCES course(id) ON DELETE CASCADE
        );
    
    `;
    const createSubTaskTable = `
        CREATE TABLE IF NOT EXISTS subtasks (
        id SERIAL PRIMARY KEY,
        sub_task_name VARCHAR(255) NOT NULL,
        task_id INTEGER NOT NULL,
        still_active BOOL NOT NULL,
        CONSTRAINT fk_subtask
            FOREIGN KEY(task_id)
                REFERENCES tasks(id) ON DELETE CASCADE
        
        );
    
    `;

    try {
        await pool.query(createUserTableQuery);
        await pool.query(createCourseTable);
        await pool.query(createTaskTable);
        await pool.query(createSubTaskTable);

        console.log("Users table created or already exists");
    } catch (error) {
        console.error("Error creating tables:", error);
    }
};

// Run table creation on module load
createTables();

module.exports = pool;