const User = require('../model/auth');
const appError = require('../utility/appError');
const bcrypt = require('bcryptjs');


const register = async (req, res, next) => {
    console.log(req.body);
    const { firstName, lastName, email, password } = req.body;
    const oldUser = await User.findOne({ email: email});
    if(oldUser) {
        const error = appError.create('user is mawgoud', 400,"REGISTER FAIL")
        return next(error);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword
    })

    await newUser.save();
    res.status(201).json({status: "SUCCESSFULLY REGISTERED", data: {user: newUser}})
};
const login = async (req, res, next) => {
    const {email, password} = req.body;

    if(!email && !password) {
        const error = appError.create('email and password are required', 400, "fail")
        return next(error);
    }
    const user = await User.findOne({email: email});
    if(!user) {
        const error = appError.create('user not found', 400, "LOGIN FALI")
        return next(error);
    }
    const matchedPassword = await bcrypt.compare(password, user.password);
    if(user && matchedPassword) 
    res.json({status:"LOGIN SUCCESSSSS" , data:{user}})
}

module.exports = {
    register,
    login
    }