module.exports = {
    MONGO_CONNECT_URL: process.env.MONGO_CONNECT_URL || 'mongodb://localhost:27017/',
    PORT: process.env.PORT || 6000,
    API:process.env.API || 'https://localhost:6000',
    // ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || 'http://localhost:4200',

    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'xxx',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'zzz',
    JWT_ACTIVATE_SECRET: process.env.JWT_ACTIVATE_SECRET || 'QQQ',
    JWT_FORGOT_PASSWORD_SECRET: process.env.JWT_FORGOT_PASSWORD_SECRET || 'EEEE',

    SEND_MAIL_EMAIL: process.env.SEND_MAIL_EMAIL || 'dcs fv',
    SEND_MAIL_PASSWORD: process.env.SEND_MAIL_PASSWORD || '1234567'
}
