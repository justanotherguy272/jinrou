module.exports = function (mysql) {
  var sql = "CREATE TABLE IF NOT EXISTS roles (id INT AUTO_INCREMENT PRIMARY KEY," +
    " name VARCHAR(255)," +
    " description VARCHAR(255)," +
    " side INT)";
  db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table Role created")
  });
};