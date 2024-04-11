const express = require('express');
const app = express();
const mongoose = require('mongoose');
const httpStatusText = require('./utility/httpStatusText');
const url="mongodb+srv://catalyst:2mca9bcy@catalyst.mcmdbos.mongodb.net/catalyst?retryWrites=true&w=majority&appName=catalyst"
mongoose.connect(url).then(() => {
    console.log('let is starting... ')
})

app.use(express.json());

// const coursesRouter = require('./routes/courses.route');
const usersRouter = require('./router/user-router');


// app.use('/api/courses', coursesRouter) // /api/courses

app.use('/api/users', usersRouter) // /api/users

// global middleware for not found router
app.all('*', (req, res, next)=> {
    return res.status(404).json({ status: httpStatusText.ERROR, message: 'this resource is not available'})
})

// global error handler
app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({status: error.statusText || httpStatusText.ERROR, message: error.message, code: error.statusCode || 500, data: null});
})






app.listen( 5900, () => {
    console.log('listening on port: 5900');
});
