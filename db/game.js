module.exports = function (mysql) {
  var sql = "CREATE TABLE IF NOT EXISTS games (id INT AUTO_INCREMENT PRIMARY KEY," +
    " room_id INT," +
    " state INT)";
  db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table Game created")
  });
};