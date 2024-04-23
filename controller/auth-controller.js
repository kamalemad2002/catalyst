const User = require('../model/auth');
const appError = require('../utility/appError');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');


const register = async (req, res, next) => {
    // console.log(req.body);
    const { firstName, lastName, email, password,role } = req.body;
    const oldUser = await User.findOne({ email: email});
    if(oldUser) {
        const error = appError.create('user is already exit', 400,"REGISTER FAIL")
        return next(error);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role
    })
    const token=await JWT.sign({email:newUser.email,id:newUser.id,role:newUser.role},"66235b332f534a892a4ac368c776f252e4c96894fbbcf363448cf262a8171d22",{expiresIn:"10m"})
    console.log(token);
    newUser.token=token;
    await newUser.save();
    res.status(201).json({status: "SUCCESSFULLY REGISTERED!", data: {user: newUser}})
    
};
const login = async (req, res, next) => {
    const {email, password} = req.body;

    if(!email && !password) {
        const error = appError.create('email and password are required', 400, "fail")
        return next(error);
    }
    const user = await User.findOne({email: email});
    if(!user) {
        const error = appError.create('email not found!', 400, "LOGIN FALI")
        return next(error);
    }
    const matchedPassword = await bcrypt.compare(password, user.password);
    if(user && matchedPassword){ 
    const token=await JWT.sign({email:user.email,id:user.id,role:user.role},"66235b332f534a892a4ac368c776f252e4c96894fbbcf363448cf262a8171d22",{expiresIn:"10m"})
    res.json({status:"LOGIN SUCCESSSSS!" , data:{token},kamal:{user}})}
}
// const logout=(req,res)=>{
//     req.session.destroy(()=>{
//         res.redirect(`/`);
//     })
// }
module.exports = {
    register,
    login,
    }