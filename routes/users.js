const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const  bcrypt = require('bcryptjs');
const passport = require('passport');
const bodyParser = require('body-parser');
module.exports = router;

const con = require('../DBconnection');


//User Login route
router.post('/login' ,(req,res) => {
    var email = req.body.email;
    var password = req.body.password;
    new Promise(function(resolve, reject){
        con.query('SELECT password FROM student WHERE email = ?', [email], function(err, result, field) {
            if (err) throw err;
            if (result.length == 0) {
                resolve(-1);
                //res.status(403).json("Doesn't exist");
            }
            else if (result[0].password == password) {
                req.session.email = email;
                res.status(200).json('student');
            }
            else
                res.status(403).json('Invalid');
        });
        }).then(function(status) {
            con.query('SELECT password FROM teacher WHERE email = ?', [email], function (err, result, field) {
                if (err) throw err;
                if (result.length == 0) {
                    res.status(403).json("Doesn't exist");
                }
                else if (result[0].password == password) {
                    req.session.email = email;
                    res.status(200).json('teacher');
                }
                else
                    res.status(403).json('Invalid');
            });
        });
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
            
            var query ="INSERT into student(email, fname, lname, password, collegeid, start_year, departmentid) values ('" + req.body.email+ "' ,'" +req.body.fname + "' , '" +  req.body.lname + "' ,'" + req.body.password + "' , '" + req.body.collegeid + "' , '" + req.body.start_year + "' , '" + req.body.collegeid +  "' );" ;
            console.log(query);
            con.query(query,function(err,result) {
                if(err)
                    //.result="Invalid Data !";
                    throw err ;
                else    
                    json.result="Successfully Registered !";
                res.status(200).send(JSON.stringify(json));
            });
        }    
    });
});


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
       else
        {
            var query ="INSERT into college(name, link) values ('" + req.body.name+ "' ,'" +req.body.link +  "' )" ;
            console.log(query);

            con.query(query,function(err,result) {
                if(err)
                    json.result="Invalid Data !";
                else
                    json.result="Successfully Registered !";
                res.send(JSON.stringify(json));
            });
        }
     });
});


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
          res.status(200).send(JSON.stringify(json));
       }
       else
        {
            var query ="INSERT into teacher(fname, lname, departmentid, collegeid, email, password) values ('" + req.body.fname+ "' ,'" +req.body.lname + "' , '" + req.body.departmentid + "' ,'" +req.body.collegeid + "' , '" + req.body.email+ "' , '" +  req.body.password+ "' )" ;
            console.log(query);

            con.query(query,function(err,result) {
                if(err)
                    json.result="Invalid Data !";
                else
                    json.result="Successfully Registered !";
                res.status(200).send(JSON.stringify(json));
            });
        }
     });
});

//Login 
// router.post('/login',(req,res ,next) => {
//     console.log(req.body);
//
//
// });
//
// //Success redirect
// router.get('/login-success' , (req,res) =>{
//
//     var json = {
//         result : "success"
//     };
//     res.send(JSON.stringify(json));
//
// });
//
// //Failure redirect
// router.get('/login-failure' , (req,res) =>{
//     var json = {
//         result : "failure"
//     };
//     res.send(JSON.stringify(json));
//
//
// });