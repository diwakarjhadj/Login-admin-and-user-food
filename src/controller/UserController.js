const bcrypt=require('bcryptjs');
const User=require('../model/User');
const jwt=require('jsonwebtoken');
require('dotenv').config();
let userController={}
userController.login=async(req,res)=>{
    console.log("User Login:::::");
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(401).json({error: "Invalid Email or Password"});
        }
        const passwordMatch=await bcrypt.compare(password,user.password);
        if(!passwordMatch)
        {
            return res.status(401).json({error: "Invalid Email or Password"})
        }
        let data={
            user_id: user._id.toString(),
            name: user.name,
            email: user.email,
            phone_number: user.phone_number,    
            address: user.address,
            role: user.role,
        }
        const token=jwt.sign(data,process.env.JWT_SECRET_KEY);
        data.token=token;
        res.status(200).json({
            success: true,
            data: data,
            message: "User Logged in Successfully"
        })
    }catch(err){
        console.log("Error in User Controller",err);
        res.status(500).json({error: `Error in User Controller ${err}`});
    }
}

userController.signup=async(req,res)=>{
    console.log("SignUp Controller");
    try{
        const {name,email,phone_number,address,role,password}=req.body;
        const existUser=await User.findOne({email});
        console.log("Exist User",existUser);
        if(existUser){
            return res.status(400).json({error: "User Already Exist"});
        }
        const newUser=await User.create(({name,email,phone_number,address,role,password}));
        let data={
            user_id: newUser._id.toString(),
            name: newUser.name,
            email: newUser.email,
            phone_number: newUser.phone_number,
            address: newUser.address,
            role: newUser.role
        }
        const token=jwt.sign(data,process.env.JWT_SECRET_KEY);
        data.token=token;
        return res.status(201).json({success: true, message: "User added Successfully", data: data});
    }catch(err){
        console.log(`SignUp Controller Error ${err}`);
        return res.status(500).json({error: `Error in signup Controller ${err}`});
    }
}


// userController.signup = async (req, res) => {
//     console.log("SignUp Controller");
//     try {
//         const { name, email, phone_number, address, role, password } = req.body;

//         // Check if user already exists
//         const existUser = await User.findOne({ email });
//         console.log("Exist User", existUser);
//         if (existUser) {
//             return res.status(400).json({ error: "User Already Exists" });
//         }

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create a new user
//         const newUser = await User.create({
//             name,
//             email,
//             phone_number,
//             address,
//             role,
//             password: hashedPassword
//         });

//         // Prepare the data to be sent in the response
//         let data = {
//             user_id: newUser._id.toString(),
//             name: newUser.name,
//             email: newUser.email,
//             phone_number: newUser.phone_number,
//             address: newUser.address,
//             role: newUser.role
//         };

//         // Generate a JWT token
//         const token = jwt.sign(data, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
//         data.token = token;

//         // Send success response
//         return res.status(201).json({ success: true, message: "User added successfully", data });
//     } catch (err) {
//         console.log(`SignUp Controller Error ${err}`);
//         return res.status(500).json({ error: `Error in signup Controller ${err}` });
//     }
// };

userController.update=async(req,res)=>{
    console.log("User Controller Update......");
    try{
        const user_id=req.user.user_id;
        const user=await User.findById(user_id);
        if(!user){
            return res
        .status(200)
        .json({ success: false, message: "User does not exist" });
        }
        const updated_user=await User.findByIdAndUpdate(user_id,req.body);
        let data={
            user_id: updated_user._id.toString(),
            name: updated_user.name,
            email: updated_user.email,
            phone_number: updated_user.phone_number,
            address: updated_user.address,
            role: updated_user.role
        }
        return res.status(200).json({
            success: true,
            message: "User Updated Successfully",
            data: data
        });
    }catch(err){
        console.log(`Updated Controller Error ${err}`);
        return res.status(500).json({error: `Error in Updated Controller ${err}`})
    }
}
module.exports=userController;