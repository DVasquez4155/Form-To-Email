const nodemailer = require('nodemailer');
const Handlebars = require('handlebars');
const fs = require('fs');
module.exports = (form) => {
    const transporter = nodemailer.createTransport({
        host: process.env.email_host,
        port: 587,
        auth: {
            user: process.env.email_user,
            pass: process.env.email_pass
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    const source = fs.readFileSync('mail.html', 'utf8');
    const template = Handlebars.compile(source);
    const context = {message:form.message, time: form.time};
    const html = template(context);
    const mailOptions = {
        from: `"${form.name}" <${form.email}>`,
        to: process.env.email_email,
        subject: form.subject,
        text: form.message,
        html: html
    };
    
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
