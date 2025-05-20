const nodeMailer = require('nodemailer');

const sendEmail =async (to, subject, text) => {
    try {
        const transporter = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSword,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject, 
            text,
        };  

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    }catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Email not sent');
    }
};
module.exports = sendEmail;