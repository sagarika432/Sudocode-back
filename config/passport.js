// const LocalStrategy = require('passport-local').Strategy;
// const mysql = require('mysql');
// const con = mysql.createConnection({
//     host:"localhost",
//     user : "root",
//     password:"",
//     database: "college_management"

// });
  const  bcrypt = require('bcryptjs');

// module.exports = function(passport){
//     passport.use(new LocalStrategy({
//     usernameField:'email'},(email,password,done) => {
//         var check = "select * from student where email = '" + email + "'";
//         con.query(check,function(err,result)
//         {                                                                                                                                                                                                                                                                                                                                                                                                                             
//             if(!result)
//             {
//                return done (null,false,{message : 'No User Found'});

    
//             }
//             bcrypt.compare(password , result.password , (err , isMatch) =>{
//                 if(isMatch)
//                 {
//                     return done (null,result);

//                 }else{
//                     return done (null,false,{message : 'Password incorrect'});
//                 }
//             })
                
//         });


//     }));

//     passport.serializeUser(function(result, done) {
//         done(null, result.email);
//       });
      
//       passport.deserializeUser(function(email, done) {
//         con.query(check,function(err,result) {
//           done(err, result);
//         });
//       });

// }



var express = require('express');
var router = express.Router();
var passportLocal = require('passport-local').Strategy;
var passportHttp =require('passport-http').BasicStrategy;
var passport    =require('passport');
var mysql = require('mysql');
//var bcrypt = require('bcrypt');


