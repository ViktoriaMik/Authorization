const router = require('express').Router();
const {userMiddleware,authMiddleware} = require('../middlewares/')
const {userController} = require('../controllers')


router.get('/user', authMiddleware.checkAccessToken,userController.getUser);

module.exports = router;
