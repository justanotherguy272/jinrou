let express = require('express');
let router = express.Router();
let passport = require('passport');

router.get('/login', function (req, res) {
  console.log('get in here');
  // res.send(JSON.stringify({redirect: '/'}))
});

router.post('/login', passport.authenticate('local-login'), function (req, res, next) {
  console.log('get here');
  res.send(JSON.stringify({redirect_to: '/',  user: req.user}));
});

// router.post('/logging_in', passport.authenticate('local', {failureRedirect: '/authen/login'}), function(req, res) {
//     let recv = JSON.stringify({
//         email: req.body.email,
//         password: req.body.password
//     });
//     console.log(recv);
//     res.send(recv);
// });

router.get('/sign_up', function (req, res) {
  res.send(JSON.stringify({curr_view: 'sign-up-page'}));
});

router.post('/sign_up', passport.authenticate('local-sign-up'), function (req, res, next) {
  console.log('session:');
  console.log(req.session.passport.user);
  res.send(JSON.stringify({redirect_to: '/', user: req.user}));
});

router.get('/session', function(req, res) {
  if(req.isAuthenticated()) {
    console.log('authen')
    res.send(JSON.stringify({authenticated: true, user: req.user}));
    // console.log('user:');
    // console.log(req.user);
  } else {
    console.log('unauthen')
    res.send(JSON.stringify({authenticated: false, user: null}));
  }
});

module.exports = router;