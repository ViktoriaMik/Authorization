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
    authMiddleware.checkActionToken(tokenType.ACTIVATE, true),
    authController.activateUser
);
router.post('/login',
    userMiddleware.isUserPresent,
    authMiddleware.isPasswordMatched,
    authController.login
);
router.post('/logout',
    authMiddleware.checkAccessToken,
    authController.logout
);
router.get('/refresh',
    authMiddleware.checkRefreshToken,
    authController.refresh
);
router.post('/forgot-password',
    userMiddleware.isUserPresent,
    authMiddleware.forgotPasswordEmail
)
router.post('/password/forgot/reset',
    authMiddleware.checkActionToken(tokenType.FORGOT_PASSWORD, false),
    authController.resetPassword
)
module.exports = router;
