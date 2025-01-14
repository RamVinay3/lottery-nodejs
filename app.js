const fs=require('fs');
const path =require('path');

const express=require('express');
const requestParser=require('body-parser');
const mongoose = require('mongoose');
const helmet=require('helmet');
const compression=require('compression');
const morgan=require('morgan');

//routes calling

const authRoute=require('./routes/auth');
const lotteryRoute=require('./routes/lottery');
const interactRoute=require('./routes/userInteraction');


const accessLogStream = fs.createWriteStream( path.join(__dirname, 'access.log'), { flags: 'a' });

//variable declarations
const app=express();

app.use(helmet());
app.use(compression());
app.use(morgan('combined',{stream:accessLogStream}));
app.use(requestParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


app.use('/',authRoute);
app.use('/ticket',lotteryRoute);
app.use('/user',interactRoute);

app.use((error, req, res, next) => {
    
    console.log(error.message,"error in global");
    var errorMsg={
      "error":error.message,
      "hasError":true
    }
    console.log(errorMsg,"errorMsg");
    return res.status(500).json(errorMsg);
  });



// app.use((req,res,next)=>{
//     console.log("idk idc");
//     return res.json({"hi":"message"});
// })
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.cg3ew.mongodb.net/${process.env.MONGO_DEFAULT_DB}`)
.then(() => {
  console.log('Database connected');
  console.log('server started');
  app.listen(process.env.PORT || 80);
})
.catch(err => console.error('Database connection error:', err));

