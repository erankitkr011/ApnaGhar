const Razorpay = require('razorpay');
const RECEIPT = require('../models/Reciept')

require('dotenv').config();

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const BillRecipt = async (req, res) => {
    const { billId, paymentId } = req.body;
    const userId = req.user.id;


    try {
        const payment = await razorpayInstance.payments.fetch(paymentId);
        console.log('Fetched Payment:', payment);

        const receiptData = {
            billId,
            userId,
            paymentId: payment.id,
            amount: payment.amount,
            status: payment.status,
            Order_id: payment.order_id,
            method: payment.method,
            card_id: payment.card_id || "",
            bank: payment.bank || "",
            wallet: payment.wallet || "",
            vpa: payment.vpa || "",
            email: payment.email,
            contact: payment.contact ? parseInt(payment.contact.replace('+', '')) : 0,
            timespan: new Date(payment.created_at * 1000)
        };

        console.log('Receipt Data:', receiptData);

        const newReceipt = new RECEIPT(receiptData);
        console.log('New Receipt Object:', newReceipt);

        await newReceipt.save();
        res.status(200).json({ message: 'Receipt saved successfully', receipt: newReceipt });
    } catch (error) {
        console.error('Error saving receipt:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};


module.exports ={
    BillRecipt
}