const express=require('express');
const userController=require('../controller/UserController');
const resturantController=require('../controller/ResturantController');
const router=express.Router();
const verifyJWT=require('../middleware/VerifyJWT');
router.post("/signup",userController.signup);
router.post("/signin",userController.login);

router.post("/resturant",verifyJWT,resturantController.addresturant);

module.exports=router;