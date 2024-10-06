const AllNotify = require('../models/AllNotifi');

const AllNotification = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const newNotification = new AllNotify({ message });
    await newNotification.save();

    res.status(201).json({ message: 'Notification saved successfully', notification: newNotification });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAllNotification = async (req, res) => {
  try {
    const notifications = await AllNotify.find().sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { AllNotification, getAllNotification };