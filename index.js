const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.DB_CONNECTION).then(() => {
    console.log("connected");
})

const usersRoute = require('./routes/users');
app.use('/users', usersRoute);


const tasksRoute = require('./routes/tasks');
app.use('/tasks', tasksRoute);


const boardsRoute = require('./routes/boards');
app.use('/boards', boardsRoute);

app.listen(3000);