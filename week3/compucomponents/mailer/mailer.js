var nodeMailer = require("nodemailer");

var mailer = nodeMailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'leonie.harvey92@ethereal.email',
        pass: 'YArKtGnZVvwcuSxQrW'
    }
});

module.exports = mailer;