let LocalStrategy = require('passport-local').Strategy;
let User = require('../model/user');

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id)
    });

    passport.deserializeUser(function(id, done) {
        // User.findById(id, function(err, user) {
        //     done(err, user)
        // })
    });

    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'name',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, name, password, done) {
        console.log(name + ' - ' +password);
            // asynchronous
            // User.findOne wont fire unless data is sent back
            process.nextTick(function() {

                // find a user whose email is the same as the forms email
                // we are checking to see if the user trying to login already exists
                // User.findOne({ 'local.name' :  name }, function(err, user) {
                //     // if there are any errors, return the error
                //     if (err)
                //         return done(err);
                //
                //     // check to see if theres already a user with that email
                //     if (user) {
                //         return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                //     } else {
                //         // save the user
                //
                //     }
                //
                // });
                if(User.createUser(name, User.generateHashPassword(password))) {
                    done(null, User)
                }
            });

        }));
};