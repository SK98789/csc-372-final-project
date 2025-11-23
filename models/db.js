require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

// Create users table on startup if it doesn't exist
const createUsersTable = async () => {
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

    try {
        await pool.query(createUserTableQuery);
        await pool.query(createCourseTable);
        console.log("Users table created or already exists");
    } catch (error) {
        console.error("Error creating tables:", error);
    }
};

// Run table creation on module load
createUsersTable();

module.exports = pool;