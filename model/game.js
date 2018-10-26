module.exports = {
  createGame: (room_id) => {
    return new Promise((resolve, reject) => {
      let query = "insert into `games` (room_id, state) values ('"+ room_id + "', '" + 0 +"')";
      db.query(query, (err, result) => {
        if(!err) {
          console.log('room created, id: ' + result.insertId);
          // console.log(result);
          resolve(result.insertId);
        } else {
          console.log('create room failed');
          // console.log(err);
          reject(err);
        }
      })
    })
  }
}