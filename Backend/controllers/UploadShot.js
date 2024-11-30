const Bill = require("../models/bill");

const upload = async (req, res) => {
  const { id, url } = req.body;
  try {
    // Find the bill by ID and update the shot_url field
    const updatedBill = await Bill.findByIdAndUpdate(
      id,
      { shot_url: url },
      { new: true }
    );

    if (!updatedBill) {
      return res.status(404).json({ error: "Bill not found" });
    }

    res.status(200).json({ message: "Shot URL updated successfully", bill: updatedBill });
  } catch (error) {
    console.error("Error updating shot URL:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};

module.exports = upload