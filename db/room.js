module.exports = function (mysql) {
  var sql = "CREATE TABLE IF NOT EXISTS rooms (id INT AUTO_INCREMENT PRIMARY KEY," +
    " leader_id INT," +
    " name VARCHAR(255)," +
    " password VARCHAR(255)," +
    " capacity INT," +
    " is_active TINYINT(1)," +
    " game_id INT)";
  db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table Room created")
  });
};