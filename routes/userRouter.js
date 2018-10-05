var express = require('express');
var router = express.Router();
//var User = require('../User');
var session = require('express-session');
var connection = require('../DBconnection');


router.post('/create', function(req, res) {
    var user = new User.User(req.body.name, req.body.email, req.body.phone_no, req.body.pan_no, req.body.netWorth, req.body.balance, req.body.password);
    User.createUserInDB(user).then( function(status) {
        console.log(req.body.email + ": " + req.body.password + " created!");
        req.session.email = user.email;
        res.status(200);
        res.json( email );
        res.end();
    }, function(status) {
        res.json( 'Use unique informatiion!' );
    });
});

module.exports = router;