module.exports = {
  getRooms: () => {
    return new Promise((resolve, reject) => {
      let room_query = "SELECT * FROM `rooms`";
      db.query(room_query, (err, result) => {
        if(!err) {
          resolve(result);
        } else {
          reject(err);
        }
      })
    })
  },

  getRoomInfo: (id) => {
    return new Promise((resolve, reject) => {
      let room_query = "SELECT * FROM `rooms` WHERE id='" + id + "'";
      db.query(room_query, (err, result) => {
        if(!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    });
  },

  getRoomUserList: (id) => {
    return new Promise((resolve, reject) => {
      let room_query = "SELECT name FROM `users` WHERE id IN (SELECT user_id FROM `room_users` WHERE room_id='" + id + "')";
      db.query(room_query, (err, result) => {
        if(!err) {
          resolve(result);
        } else {
          reject(err);
        }
      })
    });
  },

  createRoom: (name, username, id, capacity, password) => {
    return new Promise((resolve, reject) => {
      let find_query = "SELECT * FROM `rooms` WHERE leader_id='" + id + "'";
      // console.log(name + ',' + username + ',' + id + ',' + capacity);
      db.query(find_query, (err, result) => {
        if(result.length !== 0 ) {
          reject('You already created a room!');
        } else {
          if(!name) name = username + " room";
          if(!capacity) capacity = 10;
          let create_room_query = "INSERT INTO `rooms` (name, leader_id, capacity, password) VALUES ('" +
            name + "', '" + id + "', '" + capacity + "','" + password + "')";
          db.query(create_room_query, (err, result) => {
            if(!err) {
              resolve(result);
            } else {
              reject(err);
            }
          })
        }
      });
    })
  },
};