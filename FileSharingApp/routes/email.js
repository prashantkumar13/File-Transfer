const nodemailer = require("nodemailer");

// Function to send email with attachment using Nodemailer
async function sendEmailWithAttachment(email, subject, text, file) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com', // Update with your Gmail email
            pass: 'your-password' // Update with your Gmail password or app-specific password
        }
    });

    const mailOptions = {
        from: 'your-email@gmail.com', // Sender address (should be your Gmail)
        to: email,
        subject: subject,
        text: text,
        attachments: [
            {
                filename: file.originalname,
                path: file.path // Path to the uploaded file
            }
        ]
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent:', mailOptions);
}

module.exports = sendEmailWithAttachment;