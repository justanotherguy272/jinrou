module.exports = function (mysql) {
  var sql = "CREATE TABLE IF NOT EXISTS rounds (id INT AUTO_INCREMENT PRIMARY KEY," +
    " user_id INT," +
    " action1 INT," +
    " action2 INT," +
    " vote INT)";
  db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table Round created")
  });
};