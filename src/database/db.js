const mongoose=require('mongoose');
const connectionDB=()=>{
    const connectionURL=process.env.URL;
    mongoose.connect(connectionURL).then(()=>{
        console.log("Successfully Connect to DB");
    }).catch((err)=>{
        console.log("Database Connection Error",err);
    })
};
module.exports= connectionDB;