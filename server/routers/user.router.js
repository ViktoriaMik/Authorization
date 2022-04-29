const router = require('express').Router();
const {userMiddleware} = require('../middlewares/')


router.get('/', userMiddleware.isBodyValid,);

module.exports = router;
