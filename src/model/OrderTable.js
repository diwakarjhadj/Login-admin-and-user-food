const mongoose=require('mongoose');
const orderSchema=new mongoose.Schema({
    user_id:{
        type: String,
        required: true,
        unique: true
    },
    resturant_id:{
        type: String,
        required: true,
        unique: true
    },
    total_amount:{
        type: String,
        required: true,
    },
    status:{
        type: String,
        required: true,
    }
});
const order=mongoose.model('order',orderSchema);
module.exports=order;
