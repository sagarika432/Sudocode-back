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

app.use(function(req,res,next){

    res.locals.result = req.result || null ;
    next();
});

//use routes
app.use('/users',users);





const port = process.env.PORT || 3500;
app.listen(port,()=>{
    console.log(`Server started on port ${port}`);
});

app.get('/',(req,res) => {
    url = 'https://github.com/sagarika432';
    var json = {
    
        result : {}
        
        };
    request('https://github.com/sagarika432', (error, response, html) => {
    if (!error && response.statusCode == 200) {


        //console.log(html);
        const $ = cheerio.load(html);
        const no_repositories = $('.UnderlineNav-body') ;
        console.log(no_repositories.text());
      
                 $('.UnderlineNav-body a').each((i,el)=>{
                           // const item =$(el).text();
                            
                            const key = $(el).attr('title');
                            const x = $(el);
                            //const item1 = $(el).find('span').text();
                            
                            var value='' ;
                            if (x.has('span'))
                                value = (x.children('span').text().replace(/\s\s+/g, ''));
                            else    
                                value ='';
                            console.log(key + " :" + value);
                    
                           
                            json.result [key] = value;
                            
                        })
                    }
                    res.send(JSON.stringify(json));
    });
                    
                
});














 
    