const express = require('express');
const app = express();
const mongoose = require('mongoose');
const url = "mongodb://kamalemad2002:2mca9bcy@ac-kvhzegf-shard-00-00.hfwgqzr.mongodb.net:27017,ac-kvhzegf-shard-00-01.hfwgqzr.mongodb.net:27017,ac-kvhzegf-shard-00-02.hfwgqzr.mongodb.net:27017/?ssl=true&replicaSet=atlas-mi92hk-shard-0&authSource=admin&retryWrites=true&w=majority&appName=learn"
mongoose.connect(url).then(() => {
    console.log('MONGO is here!')
})
app.use(express.json());
const projectRouter = require('./router/project-router.js');
const usersRouter = require('./router/auth-router.js');
app.use('/api/projects', projectRouter);
app.use('/api/users', usersRouter);
app.all('*', (req, res, next) => {
    return res.status(404).json({ status: "errorr", message: 'this resource is not available' })
})
app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({ status: error.statusText || "error", message: error.message, code: error.statusCode || 500, data: null });
})






app.listen(5000, () => {
    console.log('listening on port: 5000');
});
