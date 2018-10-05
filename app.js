const express = require('express');
const mongoose = require('mongoose');
const rp = require('request-promise');
//const cherio = require('cheerio');
const Table = require('cli-table');
const request = require('request');
const cheerio = require('cheerio');


const fs = require('fs');
const writeStream = fs.createWriteStream('post.csv');

// Write Headers
writeStream.write(`Title,Link,Date \n`);




let users = [];


const app = express();

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



















 
    