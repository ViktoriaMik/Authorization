const {WELCOME,FORGOT_PASSWORD_EMAIL,ORDER_CONFIRMED, USER_BLOCKED}
    = require('../constants/email.action.enum');

module.exports = {
    [WELCOME]: {
        templateName: 'welcome',
        subject: 'Welcome !!'
    },
    [ORDER_CONFIRMED]: {
        templateName: 'order',
        subject: 'Cool!'
    },
    [USER_BLOCKED]: {
        templateName: 'us-b',
        subject: 'oops'
    },
    [FORGOT_PASSWORD_EMAIL]: {
        templateName: 'forgot-password',
        subject: 'Everybody forgot something. Dont worry )'
    }
};
