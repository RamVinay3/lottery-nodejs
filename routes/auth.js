const express=require('express');

const authController=require('../controllers/authController');

const route=express.Router();
const isAuth=require('../middleware/is-auth');

route.post('/login',authController.login);

route.post('/signup',authController.signup);

route.post('/forgot-password',authController.forgotPassword);

route.post('/reset-password/:link',authController.resetPassword);
route.get('/getDetails',isAuth,authController.getUserDetails);

module.exports=route;