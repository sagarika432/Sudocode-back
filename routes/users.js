const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const  bcrypt = require('bcryptjs');
const passport = require('passport');
const bodyParser = require('body-parser');
module.exports = router;

const con = mysql.createConnection({
    host:"localhost",
    user : "root",
    password:"",
    database: "college_management"

});


//User Login route
router.get('/login' ,(req,res) => {

    res.send('login');

});

//
router.get('/register' ,(req,res) => {

    res.send('register');
    
});

//student register form post
router.post('/student-register' ,(req,res) => {
    console.log(req.body);
    var json = {
    
        result : {}
        
    };
    var checkduplicate = "select * from student where email = '" + req.body.email + "'";
    con.query(checkduplicate,function(err,result)
    {
        
        if(result.length > 0 )
        {
            json.result="Email id alerady in use";
            res.send(JSON.stringify(json));

        }
        else{
            
            var query ="INSERT into student values ('" + req.body.email+ "' ,'" +req.body.fname + "' , '" +  req.body.lname + "' ,'" + req.body.password +"' , '" + req.body.collegeid +  "' )" ;
            console.log(query);
            con.query(query,function(err,result) {
                if(err)
                    //.result="Invalid Data !";
                    throw err ;
                else    
                    json.result="Successfully Registered !";
                res.send(JSON.stringify(json));
            });
    
    


    
        }    
    });
    

    

});


//College register form post
router.post('/college-register' ,(req,res) => {
    console.log(req.body);
    var json = {
    
        result : {}
        
    };
    var checkduplicate = "select * from college where collegeid = '" + req.body.collegeid + "'";
    console.log(checkduplicate);
    con.query(checkduplicate,function(err,result)
    {
        if(result.length > 0)
      {
          json.result="College is alerady registered";
          res.send(JSON.stringify(json));

       }
            
     });
    var query ="INSERT into college values ('" + req.body.name+ "' ,'" +req.body.link + "' , '" + req.body.collegeid +  "' )" ;
    console.log(query);
    
    con.query(query,function(err,result) {
        if(err)
             json.result="Invalid Data !";
        else    
           json.result="Successfully Registered !";
         res.send(JSON.stringify(json));
     });

    
    

    

});


//Teacher register form post
router.post('/teacher-register' ,(req,res) => {
    console.log(req.body);
    var json = {
    
        result : {}
        
    };
    var checkduplicate = "select * from teacher where email = '" + req.body.email + "'";
    console.log(checkduplicate);
    con.query(checkduplicate,function(err,result)
    {
        if(result.length > 0)
      {
          json.result="Teacher is alerady registered";
          res.send(JSON.stringify(json));

       }
            
     });
    var query ="INSERT into Teacher values ('" + req.body.fname+ "' ,'" +req.body.lname + "' , '" + req.body.teacherid + "' ,'" +req.body.collegeid + "' , '" + req.body.email+ "' , '" +  req.body.password+ "' )" ;
    console.log(query);
    
    con.query(query,function(err,result) {
        if(err)
             json.result="Invalid Data !";
        else    
           json.result="Successfully Registered !";
         res.send(JSON.stringify(json));
     });

    
    

    

});










//Login 
router.post('/login',(req,res ,next) => {
    console.log(req.body);
   

});

//Success redirect
router.get('/login-success' , (req,res) =>{

    var json = {
        result : "success"
    };
    res.send(JSON.stringify(json));

});

//Failure redirect
router.get('/login-failure' , (req,res) =>{
    var json = {
        result : "failure"
    };
    res.send(JSON.stringify(json));
    

});



