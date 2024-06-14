const express=require('express');
const cors=require('cors');
require('dotenv').config();
const app=express();
const routes=require('./src/routes/route')
const connectionDB=require('./src/database/db');

app.use(cors());
app.use(express.json());    
connectionDB();
app.use('/',routes);
const PORT=process.env.PORT;
app.listen(PORT,()=> console.log(`Server is Running on port${PORT}`));