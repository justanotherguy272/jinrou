module.exports = function (mysql) {
  var sql = "CREATE TABLE IF NOT EXISTS game_roles (id INT AUTO_INCREMENT PRIMARY KEY," +
    " game_id INT," +
    " role_id INT)";
  db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table GameRole created")
  });
};