// const nodeMailer = require('nodemailer');
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (options) => {

    // Log SendGrid configuration (without exposing full API key)
    console.log('📧 SendGrid Configuration:');
    console.log('   API Key:', process.env.SENDGRID_API_KEY ? `${process.env.SENDGRID_API_KEY.substring(0, 10)}...` : 'NOT SET');
    console.log('   From Email:', process.env.SENDGRID_MAIL);
    console.log('   Template ID:', options.templateId);
    console.log('   Recipient:', options.email);

    // Alternative: Nodemailer SMTP
    // const transporter = nodeMailer.createTransport({
    //     host: process.env.SMTP_HOST,
    //     port: process.env.SMTP_PORT,
    //     service: process.env.SMTP_SERVICE,
    //     auth: {
    //         user: process.env.SMTP_MAIL,
    //         pass: process.env.SMTP_PASSWORD,
    //     },
    // });

    // const mailOptions = {
    //     from: process.env.SMTP_MAIL,
    //     to: options.email,
    //     subject: options.subject,
    //     html: options.message,
    // };

    // await transporter.sendMail(mailOptions);

    // SendGrid Implementation
    const msg = {
        to: options.email,
        from: process.env.SENDGRID_MAIL,
        templateId: options.templateId,
        dynamic_template_data: options.data,
    }

    console.log('📤 Attempting to send email via SendGrid...');

    try {
        await sgMail.send(msg);
        console.log('✅ Email sent successfully to:', options.email);
        console.log('   Template used:', options.templateId);
    } catch (error) {
        console.error('❌ SendGrid Error Details:');
        console.error('   Error Code:', error.code);
        console.error('   Error Message:', error.message);
        if (error.response) {
            console.error('   Response Body:', JSON.stringify(error.response.body, null, 2));
        }
        throw error; // Re-throw to be caught by the controller
    }
};

module.exports = sendEmail;
