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
router.post('/login', userMiddleware.isUserPresent, authMiddleware.isPasswordMatched, authController.login);
router.post('/logout',authMiddleware.checkAccessToken,);

router.get('/refresh', authMiddleware.checkRefreshToken, authController.refresh);
module.exports = router;
