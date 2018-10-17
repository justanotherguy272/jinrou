let LocalStrategy = require('passport-local').Strategy;

module.exports = function (passport, User) {
  passport.serializeUser(function (user, done) {
    done(null, user.id)
  });

  passport.deserializeUser(function (id, done) {
    User.getUserById(id, function (err, user) {
      done(err, user);
    })
  });

  passport.use('local-sign-up', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField: 'name',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
  }, function (req, name, password, done) {
    // console.log('passport: ' + name + ' - ' + password);
    User.createUser(name, password)
      .then(result => {
        console.log('success ' + result);
        User.getUserByName(name)
          .then(user => done(null, user))
          .catch(err => console.log('get user err ' + err));
      })
      .catch(err => {
        console.log('error' + err);
        done(null, false);
      });
  }));

  passport.use('local-login', new LocalStrategy({
    usernameField: 'name',
    passwordField: 'password',
    passReqToCallback: true
  }, function(req, name, password, done) {
    console.log('finding user');
    User.getUserByName(name)
      .then(user => {
        if(User.validPassword(user, password)) {
          done(null, user);
        } else {
          done(null, false)
        }
      })
      .catch(err => {
        done(null, false)
      })
  }));
};