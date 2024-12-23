const express=require('express');

const userInteractionController=require('../controllers/userInteractionController');
const isAuth = require('../middleware/is-auth');


const route=express.Router();

route.post('/help',isAuth,userInteractionController.postHelp);
route.post('/feedback',isAuth,userInteractionController.postFeedback);

module.exports=route;