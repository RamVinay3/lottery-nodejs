const express=require('express');

const authController=require('../controllers/authController');

const route=express.Router();


route.post('/login',authController.login);

route.post('/signup',authController.signup);

route.post('/forgot-password',authController.forgotPassword);

route.post('/reset-password/:link',authController.resetPassword);

module.exports=route;