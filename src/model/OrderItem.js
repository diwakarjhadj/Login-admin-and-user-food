const mongoose=require('mongoose');
const orderItemSchema=mongoose.Schema({
    order_id:{
        type: String,
        required: true,
        unique: true
    },
    menu_item_id:{
        type: String,
        requried: true,
        unique: true
    },
    quantity: {
        type:String,
        required: true,
        unique: true
    },
    price: {
        type: String,
        required: true,
        unique: true
    }
});
const orderItem=mongoose.model('orderitem',orderItemSchema);
module.exports=orderItem;
