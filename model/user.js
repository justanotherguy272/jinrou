let bcrypt = require('bcrypt-nodejs');

module.exports =  {
    createUser: (name, password, callback) => {
        let usernameQuery = "SELECT * FROM `users` WHERE name = '" + name + "'";
        db.query(usernameQuery, (err, result) => {
            if (err) {
                console.log('unexpected error!');
                callback(false);
            }

            if(result.length > 0) {
                console.log('user existed!');
                callback(false);
            } else {
                let hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(8))
                let query = "INSERT INTO `users` (name, password) VALUES ('" +
                    name + "', '" + hashedPassword + "')";
                db.query(query, (err, result) => {
                    console.log('creating user');
                    callback(!err);
                });
            }
        });
    },

    generateHashPassword: password => {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
    },

    validPassword: (password) => {

    },

    getUserById: (id, callback) => {
        let query = "SELECT * FROM `users` WHERE id= '" + id +"'";
        db.query(query, (err, result) => {
            callback(err, result[0])
        })
    },

    getUserByName: (name, callback) => {
        let query = "SELECT * FROM `users` WHERE name= '" + name +"'";
        db.query(query, (err, result) => {
            callback(result[0]);
        })
    }
};