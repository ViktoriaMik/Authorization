const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config({});
const cors = require('cors');
const cookieParser = require('cookie-parser')

const {PORT, MONGO_CONNECT_URL, CLIENT_URL} = require('./config/config')
const apiRouter = require('./routers/index')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())
app.use(cors());


app.use('/', apiRouter);

mongoose.connect(MONGO_CONNECT_URL).then(() => {
    console.log('Mongo connected successfully');
});
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            message: err.message
        })
})
app.listen(PORT, () => {
    console.log(`App listen ${PORT}`)
})

