const express=require('express');
const requestParser=require('body-parser');
const mongoose = require('mongoose');
//routes calling

const authRoute=require('./routes/auth');
const lotteryRoute=require('./routes/lottery');
const interactRoute=require('./routes/userInteraction');

//variable declarations
const app=express();

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
    
    console.log(error,"error");
    res.status(500).json({
      "error":error
    });
  });



// app.use((req,res,next)=>{
//     console.log("idk idc");
//     return res.json({"hi":"message"});
// })
mongoose.connect('mongodb+srv://ramvinay609:Ramvinay3@cluster0.cg3ew.mongodb.net/lottery')
.then(() => {
  console.log('Database connected');
  console.log('server started');
  app.listen(80);
})
.catch(err => console.error('Database connection error:', err));

