var bcrypt   = require('bcrypt-nodejs');

module.exports = function (mysql, con) {
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY," +
            " name VARCHAR(255), password VARCHAR(255), fb_id VARCHAR(255), fb_token VARCHAR(255), " +
            "fb_name VARCHAR(255), fb_email VARCHAR(255), gg_id VARCHAR(255), gg_token VARCHAR(255)," +
            " gg_name VARCHAR(255), gg_email VARCHAR(255), tw_id VARCHAR(255), tw_name VARCHAR(255)," +
            " tw_displayName VARCHAR(255), tw_username VARCHAR(255))";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table created2")
        });
    });

    function generateHashPassword(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
    }

    function validPassword(password) {

    }
}