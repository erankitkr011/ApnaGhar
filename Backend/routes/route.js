const express = require('express');
const Router = express.Router();

const {Signup,Login} = require('../controllers/Auth')
const {getAllRenters} = require('../controllers/AllRenter')
const {allocateRoom} = require('../controllers/AllocateRoom')
const {getAllRoomDetails} = require('../controllers/AllDetails')
const {createBill} = require('../controllers/Bill')
const {updateBill} = require('../controllers/updateBill')


Router.post('/signup',Signup);
Router.post('/login',Login);
Router.get('/allrenters',getAllRenters)
Router.post('/allocateroom',allocateRoom)
Router.get('/alldetails/:id', getAllRoomDetails); 
Router.post('/bills',createBill)
Router.put('/bills/:id', updateBill);

module.exports = {Router}
