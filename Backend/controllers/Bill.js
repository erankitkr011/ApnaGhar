const Bill = require("../models/bill");
const Home = require("../models/home");
const nodemailer = require("nodemailer");
const Mailgen = require('mailgen');

// Create a new bill
const createBill = async (req, res) => {
  try {
    const {
      homeId,
      month,
      electric_bill_units,
      electric_bill_rate,
      total_bill,
      is_paid,
      email,
    } = req.body;
    // console.log(email);

    // Find the home by ID
    const home = await Home.findById(homeId);
    if (!home) {
      return res.status(404).json({ error: "Home not found" });
    }

    const rentPrice = home.rent_price;
    const calculatedTotalBill = rentPrice + (electric_bill_units * electric_bill_rate);

    // Create a new bill
    const bill = new Bill({
      home: home._id,
      month,
      electric_bill_units,
      electric_bill_rate,
      total_bill: calculatedTotalBill,
      is_paid,
    });

    // Save the bill
    await bill.save();

    // Add the bill reference to the home
    home.bills.push(bill._id);
    await home.save();

    let config = {
      service:'gmail',
      auth:{
        user:"ankitkr23042004@gmail.com",
        pass:"dtcsjidpzpoxcaxx",
      }
    }

    const transporter = nodemailer.createTransport(config);

    let mailGenerator = new Mailgen({
      theme: 'default',
      product: {
        name: 'Mailgen',
        link: 'https://mailgen.js/',
      },
    });

    const emailContent = {
      body: {
        name: "Customer",
        intro: `Your total bill for the month of ${month} is now ready.`,
        table: {
          data: [
            {
              description: "Electric Bill Units",
              amount: electric_bill_units,
            },
            {
              description: "Electric Bill Rate",
              amount: electric_bill_rate,
            },
            {
              description: "Total Bill",
              amount: calculatedTotalBill,
            },
            {
              description: "Payment Status",
              amount: is_paid ? "Paid" : "Unpaid",
            },
          ],
        },
        outro: "Thank you for using our service!",
      },
    };

    const emailBody = mailGenerator.generate(emailContent);

    const mailOptions = {
      from: "ankitkr23042004@gmail.com",
      to: email,
      subject: "Your Monthly Bill included with Electric Bill",
      html: emailBody,
    };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ error: 'Failed to send email', details: error.message });
    }
    res.status(201).json({ message: 'Bill created and email sent successfully', bill,rentPrice });
  });
} catch (error) {
  res.status(500).json({ error: 'Internal server error', details: error.message });
}
};

const billUpdate = async(req,res)=>{
  const { billID } = req.params;
  const { is_paid } = req.body;

  try {
    const updatedBill = await Bill.findByIdAndUpdate(
      billID,
      { is_paid },
      { new: true }
    );

    if (!updatedBill) {
      return res.status(404).json({ message: 'Bill not found' });
    }

    res.status(200).json(updatedBill);
  } catch (error) {
    console.error('Error updating bill:', error);
    res.status(500).json({ message: 'Server error' });
  }
}


module.exports = {
  createBill,billUpdate
};
