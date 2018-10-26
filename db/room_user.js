module.exports = function (mysql) {
  var sql = "CREATE TABLE IF NOT EXISTS room_users (id INT AUTO_INCREMENT PRIMARY KEY," +
    " room_id INT," +
    " user_id INT)";
  db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table RoomUser created");
  });
};