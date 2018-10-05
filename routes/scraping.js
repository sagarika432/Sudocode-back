var express = require('express');
var http = require('http');
const request = require('request');
const cheerio = require('cheerio');
var router = express.Router();
module.exports = router;


router.get('/github/:githandle',(req,res) => {
    url = 'https://github.com/'+ req.params.githandle;
    var json = {
    
        result : {}
        
        };
    request(url, (error, response, html) => {
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

router.get('/linkedin' , (req,res) => {

    
    var json = {
    
        result : {}
        
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
                    
                           
                            json.result [value] = key;
                            
                        })
                  }
                    res.send(JSON.stringify(json));
    });
 


});
