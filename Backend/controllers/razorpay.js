const Razorpay = require('razorpay');
require('dotenv').config();

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createOrder = async (req, res) => {
    const { amount, currency } = req.body;
   //console.log(amount,currency)
    try {
        const options = {
            amount: amount * 100,
            currency,
            receipt: `receipt#${Math.floor(Math.random() * 10000)}`,
            payment_capture: 1
        };

        const order = await razorpayInstance.orders.create(options);
       // console.log(order)
        res.json({
           order:order
        });
    } catch (error) {
        console.error("Error creating Razorpay order:", error);
        res.status(500).json({ error: "Failed to create Razorpay order" });
    }
};

