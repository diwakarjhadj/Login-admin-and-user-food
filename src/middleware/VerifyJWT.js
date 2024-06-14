const jwt=require('jsonwebtoken');
const User= require('../model/User');
const verifyJWT=async(req,res,next)=>{
    const token=req.header('token');
    if(!token) return res.status(401).json({success: false,message: "Please Provide the valid Token",data:{}});
    try{
        const verified=jwt.verify(token,process.env.JWT_SECRET_KEY);
        const user=await User.findById(verified.user_id);
        if(!user){
            res.status(401).json({error: "User doesn't Exist"});
        }
        req.user=verified;
        next();
    }catch(err){
        res.status(400).json({success: false, message: "Provide a valid Token",data:{}});
    }
}

module.exports=verifyJWT;
