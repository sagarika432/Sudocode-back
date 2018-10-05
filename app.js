const express = require('express');
const mongoose = require('mongoose');
const rp = require('request-promise');
//const cherio = require('cheerio');
const Table = require('cli-table');
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('post.csv');

const userRouter = require('./routes/userRouter');
const teacherRouter = require('./routes/teacherRouter');

var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

const app = express();
const port = process.env.PORT || 3500;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

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