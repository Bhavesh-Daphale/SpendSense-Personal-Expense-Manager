var mysql = require('mysql');

var connection = mysql.createConnection({
    host:'localhost',
    database:'spendsense',
    user:'root',
    password:'root123',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = connection;