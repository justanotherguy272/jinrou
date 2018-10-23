module.exports = function (mysql) {
  var sql = "CREATE TABLE IF NOT EXISTS game_rounds (id INT AUTO_INCREMENT PRIMARY KEY," +
    " game_id INT," +
    " round_id INT," +
    " round_num INT)";
  db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table GameRound created")
  });
};