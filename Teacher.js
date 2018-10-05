var app = require('./app');
var connection = require('./DBconnection');
var mysql = require('mysql');
//var dateformat = require('dateformat');
// ""
module.exports = {
    addEvent: function(email, name, description, start_day, start_month, start_year, end_day, end_month, end_year)
    {
        return new Promise(function (resolve, reject) {
            var event_values = [[email, name, description, start_day, start_month, start_year, end_day, end_month, end_year]];
            connection.query('INSERT INTO events(email, name, description, start_day, start_month, start_year, end_day, end_month, end_year) VALUES ?', [event_values], function (err, result, field) {
                if (err) {
                    if (err.code == 'ER_DUP_ENTRY') {
                        reject(1);
                    }
                    else
                        throw err;
                }
                resolve(-1);
            });
        });
    }
};