const mongoose=require('mongoose');

const menuSchema=new mongoose.Schema({
    resturant_id:{
        type: String,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true,
        unique: true
    },
    description:{
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
});

const MenuTable=mongoose.model('MenuTable',menuSchema);
module.exports=MenuTable;
