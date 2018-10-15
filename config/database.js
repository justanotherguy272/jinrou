const mysql = require('mysql');
// https://github.com/mysqljs/mysql
module.exports = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'duc1405195',
    database : 'jinrou'
});