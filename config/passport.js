let LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport, User) {
    passport.serializeUser(function(user, done) {
        done(null, user.id)
    });

    passport.deserializeUser(function(id, done) {
        User.getUserById(id, function(err, user) {
            done(err, user);
        })
    });

    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'name',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        }, function(req, name, password, done) {
        console.log('passport: ' + name + ' - ' +password);
        User.createUser(name, password, (result) => {
            if(result) {
                console.log('success');
                User.getUserByName(name, (user) => {
                    done(null, user);
                })
            } else {
                console.log('error');
                done(null, false);
            }
        })
    }));
};