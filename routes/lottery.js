
const express=require('express');

const lotteryController=require('../controllers/lotteryController');
const isAuth=require('../middleware/is-auth');

const route=express.Router();

route.post('/create',isAuth,lotteryController.createTicket);
route.get('/available',isAuth,lotteryController.getAvailableTickets);
route.post('/process',isAuth,lotteryController.processTicket);
route.get('/purchased',isAuth,lotteryController.purchasedTickets);

module.exports=route;