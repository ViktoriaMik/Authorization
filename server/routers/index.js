const router = require('express').Router();

const userRouter = require('./user.router');
const authRouter = require('./auth.router');

// router.use('/users', userRouter);
router.use('/auth', authRouter);
// router.use('/auth', (req,res)=>{res.json('hello')});


module.exports = router;
