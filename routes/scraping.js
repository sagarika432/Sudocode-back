var express = require('express');
var http = require('http');
const request = require('request');
const cheerio = require('cheerio');
var router = express.Router();
var connection = require('../DBconnection');
module.exports = router;


router.get('/github',(req,res) => {
    url = 'https://github.com/';
    var email = req.session.email;
    var json = {
    
        result : {
            
        }
        
        };
    new Promise(function(resolve, reject){
        connection.query('SELECT github FROM student WHERE email = ?', [email], function(err, result, field){
            if(err) throw err;
            resolve(result[0].github);
        });
    }).then(function(github){
        request(url + github, (error, response, html) => {
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

        });
            res.status(200).send(JSON.stringify(json));
        }
    });
    },function(){});

});

router.get('/linkedin' , (req,res) => {


    
    var json2 = [];
    var json = {
    
        result : {

            
            
        }
        
    };
    request('https://internshala.com/internships/engineering-internship-in-mumbai', (error, response, html) => {
    if (!error && response.statusCode == 200) {


       // console.log(html);
         const $ = cheerio.load(html);
//const no_repositories = $('.pv-accomplishments-block__count') ;
//console.log(no_repositories.text());
      
                $('.table-cell a').each((i,el)=>{
                           //const item =$(el).text();
                            
                            const key = $(el).attr('href');
                           //const x = $(el).parent('h4');
                            //const item1 = $(el).find('span').text();
                            
                            var value= $(el).text().replace(/\s\s+/g, '') ;
                            
                            if (value == 'View Details')
                              value = 'Click on link for more details';
                           // console.log(key + " :" + value);
                            
                            var json1  ={
                                "name" : value,
                                "link" : "https://internshala.com" + key
                            }
                            json2.push(json1);
                           
                            //json.result [value] = key;
                            
                        })
                  }
                  json2.shift();
                    res.send(JSON.stringify(json2));
    });
 


});


router.get('/hackathons',(req,res) => {
    url = 'https://www.hackevents.co/hackathons';
    var json2 = [] ;
    var json = {
    
        result : {
           
        }
        
        };
    request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {


        //console.log(html);
        const $ = cheerio.load(html);
       // const no_repositories = $('.UnderlineNav-body') ;
      //  console.log(no_repositories.text());
      
                 $('.hackathon .info a').each((i,el)=>{
                           // const item =$(el).text();
                            
                            const key = $(el).attr('href');
                           // const x = $(el)
                            //const item1 = $(el).find('span').text();
                            
                            var value=$(el).text();
                            //if (x.has('span'))
                             //   value = (x.children('span').text().replace(/\s\s+/g, ''));
                           // else    
                             //   value ='';
                            //console.log(key + " :" + value);
                            var json1 = {
                                "name" : value,
                                "link" : "https://www.hackevents.co/hackathon" + key
                            }
                           
                            json2.push(json1);
                            
                        })
                    }
                    res.send(JSON.stringify(json2));
    });
 
    
});
