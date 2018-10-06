var express = require('express');
var router = express.Router();
var Teacher = require('../Teacher');
var session = require('express-session');
var connection = require('../DBconnection');

router.post('/events', function(req,res) {
    console.log(req.body);
    var email = req.session.email;
    Teacher.addEvent(email, req.body.name, req.body.description, req.body.start_day, req.body.start_month, req.body.start_year, req.body.end_day, req.body.end_month, req.body.end_year, req.body.course).then(function(status){
        res.status(200).json('success');
    });
});

router.get('/events', function(req, res){
    connection.query('SELECT * FROM events NATURAL JOIN enrolment WHERE email = ?', [req.session.email], function(err, result, field){
        if(err) throw err;
        console.log(result);
        //console.log(result[0]['']);
        res.json(result);
    });
});

router.post('/lecture', function(req,res) {
    var course = req.body.course;
    var data = req.body;
    var list = data['absent'];
    //console.log(data['course'] + data['absent']);
    var dbpromise = Promise.resolve();
        for (var i in list) {
            (function(index)
            {
            dbpromise = dbpromise.then(function () {
                return new Promise(function (resolve, reject) {
                    connection.query('SELECT bunked FROM attendance WHERE email = ? AND course = ?', [list[index], course], function (err, result, field) {
                        if (err) throw err;
                        resolve(result[0]['bunked']);
                    });
                }).then(function (bunked) {
                    return new Promise(function (resolve, reject) {
                        var new_bunked = Number(bunked) + 1;
                        connection.query('UPDATE attendance SET bunked = ? WHERE email = ? AND course = ?', [new_bunked, list[index], course], function (err, result, field) {
                            if (err) throw err;
                            if (index == (list.length - 1)) {
                                res.status(200).end();
                            }
                            resolve(1);
                        });
                    });
                });
                //connection.query('UPDATE attendance SET bunked = ?');
            });
        })(i);
        }
});

router.get('/attendance', function(req, response){
    var email = req.session.email;
    console.log("in attendance email " + email)
    //var email = "test@test.com";
    var ans = {

    };
    connection.query('SELECT a.course, c.no_of_lectures, a.bunked FROM attendance AS a INNER JOIN course AS c ON (a.course = c.name) WHERE a.email = ?;', [email], function(err, result, field){
        if(err) throw err;
        response.status(200).json(result);
        response.end();
        console.log("a" + result);
    });
    // connection.query('SELECT * FROM attendance WHERE email = ?', [email], function(err, result, field){
    //     var dbpromise = Promise.resolve();
    //     var arr = [];
    //     for(var i in result)
    //     {
    //         (function(index) {
    //             console.log(result[i]);
    //             ans["subject"] = result[index].course;
    //             ans["data"] = {};
    //             dbpromise = dbpromise.then(function () {
    //                 return new Promise(function (resolve, reject) {
    //                     connection.query('SELECT no_of_lectures FROM course WHERE name = ?', [result[index].course], function (err, res, field) {
    //                         if(err) throw err;
    //                         ans["data"]["total"] = res[0].no_of_lectures;
    //                         ans["data"]["bunked"] = result[index].bunked;
    //                         arr.push(ans);
    //                         console.log(arr);
    //                         //console.log(index + " " + result.length - 1);
    //                         if (index == (result.length - 1))
    //                             response.status(200).json(arr);
    //                         resolve(1);
    //                     });
    //                 });
    //             });
    //         })(i);
    //     }
    });

router.post('/reference',  function(req, res){
    var link = req.body.link;
    var desc = req.body.description;
    var topic = req.body.topic;
    var course = req.body.course;
    var email = req.session.email;
    //var email = "teacher@teacher.com";
    connection.query('INSERT INTO reference(email, link, description, topic, course) VALUES ?', [[[email, link, desc, topic, course]]], function(err, result, field){
        if(err) throw err;
        res.status(200).end();
    });
});

router.get('/reference', function(req, res){
    var course = req.query.course;
    console.log(typeof course);
    var email = req.session.email;
    //var email = "teacher@teacher.com";
    if(typeof course !== 'undefined') {
        connection.query('SELECT * FROM reference WHERE course = ?', [course], function(err, result, field){
            console.log(result);
            res.json(result);
            res.end();
        });
    }
    else {
        connection.query('SELECT * FROM reference WHERE email = ?', [email], function (err, result, field) {
            res.json(result);
            res.end();
        });
    }
});
module.exports = router;