let bcrypt = require('bcrypt-nodejs');

module.exports =  {
    createUser: (name, password) => {
        let usernameQuery = "SELECT * FROM `users` WHERE name = '" + name + "'";
        db.query(usernameQuery, (err, result) => {
            if (err) {
                return false;
            }

            if(result.length > 0) {
                console.log('user existed');
                return false;
            } else {
                let hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(8))
                let query = "INSERT INTO `users` (name, password) VALUES ('" +
                    name + "', '" + hashedPassword + "')";
                db.query(query, (err, result) => {
                    return !err;
                });
            }
        });
    },

    generateHashPassword: password => {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
    },

    validPassword: (password) => {

    },
    getUser: (id) => {
        let query = "SELECT * FROM `users` WHERE id= '" + id +"'";
        db.query(query, (err, result) => {
            console.log(JSON.stringify(result));
        })
    },

    printOut: (script) => {
        console.log(script);
    }
};