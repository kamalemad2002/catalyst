const mongoose = require('mongoose');
var Schema = mongoose.Schema;
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
    publishingTime: {
        type: Date,
      default:Date.now
    },
    user: { 
        type: Schema.ObjectId,
        ref: "User",
        // required: true
    },
    // user:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:`User`
    // }
})

module.exports = mongoose.model('Project', projectSchema);