var express = require('express');
var router = express.Router();
var Teacher = require('../Teacher');
var session = require('express-session');
var connection = require('../DBconnection');

router.post('/event', function(req,res) {
    Teacher.addEvent(req.body.name, req.body.description, req.body.start_day, req.body.start_month, req.body.start_year, req.body.end_day, req.body.end_month, req.body.end_year).then(function(status){
        res.status(200).send('success');
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

router.get('/events', function(req, res){
    connection.query('SELECT * FROM events', function(err, result, field){
        //console.log(result);
        //console.log(result[0]['']);
        res.json(result);
    });
});
module.exports = router;