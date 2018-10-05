var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'jaydahisar',
    database: 'college_management'     //database name to connect to
});

module.exports = connection;