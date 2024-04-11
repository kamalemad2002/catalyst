const asyncWrapper = require("../middleware/asyncWrapper");
const User = require('../model/user');
const httpStatusText = require('../utility/httpStatusText');
const appError = require('../utility/appError');
const bcrypt = require('bcryptjs');


const register = asyncWrapper(async (req, res, next) => {
    console.log(req.body);
    const { firstName, lastName, email, password } = req.body;

    const oldUser = await User.findOne({ email: email});

    if(oldUser) {
        const error = appError.create('user already exists', 400, httpStatusText.FAIL)
        return next(error);
    }

    // password hashing
    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword
    })

    await newUser.save();
    res.status(201).json({status: httpStatusText.SUCCESS, data: {user: newUser}})


})


const login = asyncWrapper(async (req, res, next) => {
    const {email, password} = req.body;

    if(!email && !password) {
        const error = appError.create('email and password are required', 400, httpStatusText.FAIL)
        return next(error);
    }

    const user = await User.findOne({email: email});

    if(!user) {
        const error = appError.create('user not found', 400, httpStatusText.FAIL)
        return next(error);
    }

    const matchedPassword = await bcrypt.compare(password, user.password);

    if(user && matchedPassword) 
    res.json({status:httpStatusText.SUCCESS,data:{users}})
})


module.exports = {
    register,
    login
}