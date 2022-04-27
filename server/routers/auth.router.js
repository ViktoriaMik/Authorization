const router = require('express').Router();
const {userMiddleware, authMiddleware} = require('../middlewares');
const {userController, authController} = require('../controllers');
const {tokenType} = require('../constants/index');

router.post('/registration',
    userMiddleware.isBodyValid,
    userMiddleware.checkUserInDB,
    userController.registration
);
router.post('/activate/:token',
    authMiddleware.checkActionToken(tokenType.ACTIVATE),
    authController.activateUser
);
// router.post('/login', userController.login);
// router.post('/logout', userController.logout);
// router.get('/activate/:link', userController.activate);
// router.get('/refresh', userController.refresh);
module.exports = router;
