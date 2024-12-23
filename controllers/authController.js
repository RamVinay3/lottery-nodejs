
const User=require('../modals/User');
const bcryptjs=require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login=(req,res,next)=>{
    

    User.findOne({email:req.body.email})
    .then((data)=>{
        if(!data){
            return res.json({
                errorCode:909,
                errorMsg:"The email or passowrd is incorrect",
            });
        }

        bcryptjs.compare(req.body.password,data.password)
        .then((doMatch)=>{
            if(doMatch){
                //do some session thing
                const token = jwt.sign(
                    {
                      email: data.email,
                      userId: data._id.toString()
                    },
                    'somesupersecretsecret',
                    { expiresIn: '1h' }
                  );
                  res.status(200).json({ 
                    token: token, 
                    userId: data._id.toString(),
                    errorCode:'0',
                    errorMsg:'The user has been logged in' 
                });

                
            }
            else{
                return res.json({
                    errorCode:909,
                    errorMsg:"The email or passowrd is incorrect",
                });
            }
        })
    })
     
   
    
       
    };
    exports.signup=(req,res,next)=>{
     
    

     User.findOne({email:req.body.email})
     .then((data)=>{
       
        if(!data){
            
            bcryptjs.hash(req.body.password,12)
            .then((hashPassword)=>{
                const newUser=new User({
                    email:req.body.email,
                    password:hashPassword,
                    firstName:req.body.firstName,
                    secondName:req.body.secondName,
            
                });
                return newUser.save();

            })
            .then((data)=>{
                return res.json({
                    "response":data,
                    "errorMsg":"The user have been created"
                })
            })
            .catch((err)=>{
                console.log(err,"error");
                var e=new Error(err);
                // e.httpStatusCode(500);
                next(e);
        
            });
        }
        else{
            return res.json({
                errorMsg:"The account already exist on this email"
            });
        }
     });

        

        
    }
    

    exports.forgotPassword=(req,res,next)=>{

        return res.json({"msg":"You forgot password"});
    }
  
    exports.resetPassword=(req,res,next)=>{

        return res.json({"msg":"You forgot password"});
    }