const Razorpay = require('razorpay');

const razorpayInstance = new Razorpay({
    key_id: "rzp_test_1862b1A6yEY3Wt",
    key_secret: "GYvml5d7i5mfORkkOBH1UOGo",
});

exports.createOrder = async (req, res) => {
    const { amount, currency } = req.body;
   console.log(amount,currency)
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

