let bcrypt = require('bcrypt-nodejs');

module.exports = {
  createUser: (name, password) => {
    return new Promise((resolve, reject) => {
      let usernameQuery = "SELECT * FROM `users` WHERE name = '" + name + "'";

      db.query(usernameQuery, (err, result) => {
        if (err) {
          console.log('unexpected error!');
          reject(err);
        }

        if (result.length > 0) {
          console.log('user existed!');
          reject(err);
        } else {
          let hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(8))
          let query = "INSERT INTO `users` (name, password) VALUES ('" +
            name + "', '" + hashedPassword + "')";

          db.query(query, (err, result) => {
            console.log('creating user');
            if (!err) {
              console.log('created!');
              resolve(result[0]);
            } else {
              console.log('not created!');
              reject(err);
            }
          });
        }
      })
    });
  },

  generateHashPassword: password => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  },

  validPassword: (user, password) => {
    return bcrypt.compareSync(password, user.password);
  },

  getUserById: (id, callback) => {
    let query = "SELECT * FROM `users` WHERE id= '" + id + "'";
    db.query(query, (err, result) => {
      callback(err, result[0])
    })
  },

  getUserByName: (name) => {
    return new Promise((resolve, reject) => {
      let query = "SELECT * FROM `users` WHERE name= '" + name + "'";
      db.query(query, (err, result) => {
        if(err) {
          reject(err);
        } else {
          resolve(result[0]);
        }
      })
    });
  }
};