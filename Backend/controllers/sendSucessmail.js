const RECEIPT = require('../models/Reciept')

const nodemailer = require("nodemailer");
const Mailgen = require('mailgen');

require('dotenv').config();

const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASS;

const SendSucessMail = async (req, res) => {
    const { billId, email } = req.body;
    console.log(billId, email);
    try {
        // Search for the receipt with the given billId
        const receipt = await RECEIPT.findOne({ billId: billId });

        if (!receipt) {
            return res.status(404).json({ error: 'Receipt not found' });
        }

        let config = {
            service: 'gmail',
            auth: {
                user: user,
                pass: pass, // Make sure to use a secure method for storing credentials
            }
        };
        
        const transporter = nodemailer.createTransport(config);

        let mailGenerator = new Mailgen({
            theme: 'default',
            product: {
                name: 'Dulari Bhawan',
                link: 'https://dularibhawan.store/',
            },
        });

        // Construct email content dynamically based on the receipt details
        const emailContent = {
            body: {
                name: "Customer",
                intro: `Your total bill details are ready.`,
                table: {
                    data: [],
                },
                outro: "Thank you for using our service!",
            },
        };

        // Add all relevant fields to the email content if they are not empty
        const fields = [
            { description: "Bill ID", amount: receipt.billId },
            { description: "User ID", amount: receipt.userId },
            { description: "Payment ID", amount: receipt.paymentId },
            { description: "Amount", amount: receipt.amount/100 },
            { description: "Payment Method", amount: receipt.method || "N/A" },
            { description: "Bank", amount: receipt.bank || "N/A" },
            { description: "Payment Status", amount: receipt.status === "authorized" ? "Paid" : "Unpaid" },
            { description: "Email", amount: receipt.email },
            { description: "Contact", amount: receipt.contact },
            { description: "Timespan", amount: new Date(receipt.timespan).toLocaleString() },
        ];

        fields.forEach(field => {
            if (field.amount) {
                emailContent.body.table.data.push({
                    description: field.description,
                    amount: field.amount,
                });
            }
        });

        const emailBody = mailGenerator.generate(emailContent);

        const mailOptions = {
            from: "ankitkr23042004@gmail.com",
            to: email,
            subject: "Your Monthly Bill Details",
            html: emailBody,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ error: 'Failed to send email', details: error.message });
            }
            res.status(201).json({ message: 'Bill created and email sent successfully', receipt });
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

module.exports = { SendSucessMail };
