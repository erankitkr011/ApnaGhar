const mongoose = require('mongoose');

const Receipt = new mongoose.Schema({
   billId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bill',
    required: true
   },
   userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'USER',
    required: true
   },
   paymentId:{
     type:String,
     required:true,
   },
   amount:{
      type:Number,
      required:true
   },
   status:{
    type:String,
     required:true,
   },
   Order_id:{
    type:String,
    default:""
   },
   method:{
    type:String,
    required:true,
   },
   card_id:{
    type:String,
    default:""
   },
   bank:{
    type:String,
    default:""
   },
   wallet:{
    type:String,
    default:""
   },
   vpa:{
    type:String,
    default:""
   },
   email:{
    type:String,
    default:""
   },
   contact:{
    type:Number,
    default:0
   },
 timespan: {
    type: Date,
    default: Date.now
   }
});

module.exports = mongoose.model('RECEIPT', Receipt);