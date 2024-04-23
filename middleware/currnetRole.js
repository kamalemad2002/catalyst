const userRoleCheck=(roles)=>{
    return (req,res,next)=>{
        const userRole=req.body.role;
        if(roles.includes(userRole)){
            next();
        }
        else{
            return res.status(401).send("ya 3m ana msh investor , wallahy ana only user 7ageer")
        }
        }
}
module.exports={
    userRoleCheck,
}