const express = require('express');
const Router = express.Router();

const {Signup,Login} = require('../controllers/Auth')
const {getAllRenters} = require('../controllers/AllRenter')
const {allocateRoom} = require('../controllers/AllocateRoom')
const {getAllRoomDetails} = require('../controllers/AllDetails')
const {createBill,billUpdate} = require('../controllers/Bill')
const {updateBill} = require('../controllers/updateBill')
const {updateUser} = require("../controllers/updateRenterData")
const {getUserDetails} = require('../userControllers/getUserDetails')
const {checkUser} = require('../config/Authorization')
const {getHomeDetails} = require('../userControllers/getHomeDetails')
const { AllNotification, getAllNotification } = require('../controllers/Notification');
const {deleteRenter,deleteRoom,deleteBill} = require('../controllers/Delete');
const { createOrder } = require('../controllers/razorpay');
const { BillRecipt } = require('../controllers/BillReceipt');
const {getReceipt} = require('../userControllers/getReceipt')

Router.post('/signup',Signup);
Router.post('/login',Login);
Router.get('/allrenters',getAllRenters)
Router.post('/allocateroom',allocateRoom)
Router.get('/alldetails/:id', getAllRoomDetails); 
Router.post('/bills',createBill)
Router.put('/bills/:id', updateBill);
Router.put('/users/:id',updateUser);
Router.get('/getuser',checkUser,getUserDetails)
Router.get('/gethomedetails',checkUser,getHomeDetails)
Router.post('/allnotification',AllNotification)
Router.get('/notifications', getAllNotification);
Router.delete('/renter/:id', deleteRenter);
Router.delete('/room/:id', deleteRoom);
Router.delete('/bill/:id', deleteBill);
Router.post('/orders', createOrder);
Router.put('/update/:billID',billUpdate)
Router.post('/receipt',checkUser,BillRecipt)
Router.get('/getreceipts', checkUser, getReceipt);

module.exports = {Router}
