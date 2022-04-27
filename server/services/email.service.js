const nodemailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const ErrorHandler = require('../error/error.handler')
const path = require('path');
const {INVALID_DATA} = require('../error/error.message')
const {SEND_MAIL_PASSWORD, SEND_MAIL_EMAIL} = require('../config/config');
const allEmailTemplates = require('../email-templates');

const templateParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email-templates')
    }
})
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: SEND_MAIL_EMAIL,
        pass: SEND_MAIL_PASSWORD
    }
})
const sendMail = async (userMail, emailAction, context = {}) => {
    const templateInfo = allEmailTemplates[emailAction]

    const html = await templateParser.render(templateInfo.templateName, context);
    if (!templateInfo) {
        throw new ErrorHandler(INVALID_DATA.message, INVALID_DATA.code)
    }
    return transporter.sendMail({
        from: 'no reply',
        to: userMail,
        subject: templateInfo.subject,
        html
    })
}
module.exports = {sendMail}
