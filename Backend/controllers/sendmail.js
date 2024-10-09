const nodemailer = require("nodemailer");
const Mailgen = require('mailgen');

const sendmail = async (email, password,name) => {
    // Configure the SMTP transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "ankitkr23042004@gmail.com", // Your email
            pass: "dtcsjidpzpoxcaxx", // Your email password (consider using environment variables)
        }
    });

    // Create a Mailgen instance
    const mailGenerator = new Mailgen({
        theme: 'default',
        product: {
            name: 'Dulari Bhawan',
            link: 'https://dularibhawan.com/', // Your product link
        },
    });

    // Construct email content
    const emailContent = {
        body: {
            name: name,
            intro: `Welcome to Dulari Bhawan! Your account has been created successfully.`,
            table: {
                data: [
                    {
                        description: "Email",
                        amount: email,
                    },
                    {
                        description: "Password",
                        amount: password,
                    },
                ],
            },
            outro: "You can log in using your credentials.",
        },
    };

    // Generate the email body
    const emailBody = mailGenerator.generate(emailContent);

    // Set up the mail options
    const mailOptions = {
        from: "ankitkr23042004@gmail.com",
        to: email,
        subject: "Welcome to Dulari Bhawan",
        html: emailBody,
    };

    // Send the email
    try {
        await transporter.sendMail(mailOptions);
        console.log('Welcome email sent successfully to:', email);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
    }
};

module.exports = { sendmail };
