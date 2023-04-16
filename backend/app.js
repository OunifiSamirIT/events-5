var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const cors = require("cors")

var logger = require('morgan');
require('dotenv').config()
const mongoose = require('mongoose')
const payment = require('./routes/payment');

var routerUsers = require('./routes/Event.route');

var indexRouter = require('./routes/index');
const passport = require('passport')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));

/* passport */
app.use(passport.initialize())
require('./security/passport')(passport)
/* connect to db */
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("connected to db"))
.catch(err=>console.log(err))
app.use('/api', indexRouter);

if (process.env.NODE_ENV === "production") {
    console.log("app in production mode");
    app.use(express.static("client/build"));
    app.get("/*", function (req, res) {
        res.sendFile(
            path.join(__dir, "client", "build", "index.html"),
            function (err) {
                if (err) res.status(500).send(err);
            }
        );
    });
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/payment', payment);

app.use('/api', routerUsers)
module.exports = app;
