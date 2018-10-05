const express = require('express');
const mongoose = require('mongoose');
const rp = require('request-promise');
//const cherio = require('cheerio');
const Table = require('cli-table');
const request = require('request');
const cheerio = require('cheerio');
var http = require('http');
var mysql = require('mysql');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const  bcrypt = require('bcryptjs');
var passportLocal = require('passport-local').Strategy;
//var passportHttp =require('passport-http').Strategy;
var expressSession = require('express-session');
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//load routes
const users = require('./routes/users');
const scraping = require('./routes/scraping');



//Passport Config
//require('./config/passport')(passport);

//express session middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    
}));



//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//passport.use(new passportHttp(verifyCredentials));



//Global variables



const userRouter = require('./routes/userRouter');
const teacherRouter = require('./routes/teacherRouter');

var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');




const port = process.env.PORT || 3500;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//use routes
app.use('/users',users);
app.use('/scraping',scraping);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.listen(port,()=>{
    console.log(`Server started on port ${port}`);
});

app.use('/teacher', teacherRouter);

