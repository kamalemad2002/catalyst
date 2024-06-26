const mongoose = require('mongoose');
const validator = require('validator');
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail , 'not a valid email address']
    },
    role: {
        type: String,
        require: true,
        enum: ["investor","user"],
        default:"user",
        },
    password: {
        type: String,
        required: true
    },
    project:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:`Project`
    }],
    token:{
        type:String
    },
    // projects:[{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:`Project`
    // }]    
    // roling:{
    //     reuired :true ,
    //     enum:["user","admin","investor"],
    // }
})

module.exports = mongoose.model('User', userSchema);