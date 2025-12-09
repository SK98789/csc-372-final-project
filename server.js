//server.js
"use strict";
const express = require("express");
const path = require('path');
const app = express();

const multer = require("multer");
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

require('dotenv').config();

const session = require('express-session');
const passport = require('passport');
require('./auth/passport');
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


const cors = require('cors');
app.use(
    cors({
        methods: 'GET,POST,PUT,DELETE',
        credentials: true,
    })
);

const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
const taskRoutes = require('./routes/taskRoutes');
const subTaskRoutes = require('./routes/subTaskRoutes');

app.use('/users', userRoutes);
app.use('/courses', courseRoutes);
app.use('/tasks', taskRoutes);
app.use('/subtasks', subTaskRoutes);
app.use('/auth', require('./auth/authRoute'));


// Serve the static files from the React app's build directory
app.use(express.static(path.join(__dirname, 'react-client/dist')));

// Direct all non-API requests to the React app's index.html
app.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(__dirname, 'react-client/dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("Server listening on port: " + PORT + "!");
});