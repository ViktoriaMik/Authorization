const router = require('express').Router();
const {userMiddleware} = require('../middlewares');
const {userController} = require('../controllers')
router.post('/registration', userMiddleware.isBodyValid,
    userMiddleware.checkUserInDB,
    userController.registration
);
// router.post('/login', userController.login);
// router.post('/logout', userController.logout);
// router.get('/activate/:link', userController.activate);
// router.get('/refresh', userController.refresh);
module.exports = router;
