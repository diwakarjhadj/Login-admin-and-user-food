const mongoose=require('mongoose');
const resturantSchema=new mongoose.Schema({
    resturant_name: {
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        requied: true,
        unique: true,
    },
    address:{
        type: String,
        required: true,
    },
    phone_number:{
        type: String,
        required: true,
        unique: true
    },
    owner_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});
const Resturant=mongoose.model('Resturant',resturantSchema);
module.exports=Resturant;
