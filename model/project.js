const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    info: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    budget: {
        type: String,
        required: true
    },
    Investors  :{
        type :[String] ,required:true
    }
})

module.exports = mongoose.model('Project', projectSchema);