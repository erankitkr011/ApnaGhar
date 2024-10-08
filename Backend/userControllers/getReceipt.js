const RECEIPT = require('../models/Reciept');

const getReceipt = async (req, res) => {
    const userId = req.user.id;

    try {
        const receipts = await RECEIPT.find({ userId: userId });
        
        if (receipts.length === 0) {
            return res.status(404).json({ message: 'No receipts found for this user.' });
        }

        res.status(200).json({ receipts });
    } catch (error) {
        console.error('Error fetching receipts:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

module.exports = { getReceipt };
