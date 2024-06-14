const Resturant=require('../model/Resturant');

let resturantController={}
resturantController.addresturant=async (req,res)=>{
    console.log("Resturant Controller");
    try{
        const {resturant_name}=req.body;
        if(req.user.role!=='owner')
        {
            return res.status(403).json({error: "unAuthorized Access....."});
        }
        const resturant=await Resturant.findOne({resturant_name});
        if(resturant)
        {
            res.status(400).send({error: "Resturant Name is already exist"});
        }
        console.log("User Id::", req.user);
        const newresturant=new Resturant({...req.body,owner_id:req.user._id});
        console.log("Resturant is:::",newresturant);
        await newresturant.save();
        res.status(201).send({success: true, data: newresturant});
    }catch(err){
        console.log("Error in Add Resturant Controller",err);
        res.status(500).json({error: "Error in Resturant Controller",err});
    }
};

module.exports=resturantController;
