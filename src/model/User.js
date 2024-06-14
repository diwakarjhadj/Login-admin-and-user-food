const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

const userSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    phone_number: {
        type: String,
        required: true,
        unique: true,
    },
    address:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        enum: ['user', 'owner'],
        default: 'user',
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre("save",async function (next){
    const user=this;
    if(!user.isModified("password")) return next();
    const hashedpassword=await bcrypt.hash(user.password,10);
    user.password=hashedpassword;   
    next();
});

const User= mongoose.model("User",userSchema);
module.exports=User;
