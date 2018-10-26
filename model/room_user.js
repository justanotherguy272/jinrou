module.exports = {
  createNewRoomUser: (room_id, user_id) => {
    return new Promise((resolve, reject) => {
      let check_existed_query = "SELECT user_id FROM `room_users` WHERE room_id ='" + room_id + "'" + " AND user_id ='" +
      + user_id  + "'";
      db.query(check_existed_query, (err, result) => {
        if(!err) {
          if(result.length > 0) {
            resolve(result);
            // console.log(result);
            // console.log("room" + room_id + "user" + user_id);
            // console.log('>0');
          } else {
            // console.log('=0');
            let query = "INSERT INTO `room_users` (room_id, user_id) VALUES ('" +
              +room_id + "','" + user_id + "')";
            db.query(query, (err, result) => {
              if (!err) {
                // console.log('done add user to room');
                resolve(result);
              } else {
                // console.log('undone add user to room');
                reject(err);
              }
            })
          }
        }
        else(reject(err));
      });
    })
  }
}