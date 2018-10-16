let express = require('express');
let router = express.Router();
let passport = require('passport');

router.get('/login', function(req, res) {
    res.send({messages: 'Trying to login'})
});

// router.post('/logging_in', passport.authenticate('local', {failureRedirect: '/authen/login'}), function(req, res) {
//     let recv = JSON.stringify({
//         email: req.body.email,
//         password: req.body.password
//     });
//     console.log(recv);
//     res.send(recv);
// });

router.get('/signup', function(req, res) {
    res.send(JSON.stringify({curr_view: 'sign-up-page'}));
});

router.post('/signing_up', passport.authenticate('local-signup'), function(req, res, next) {
    console.log('SignUp_Cookies: ', req.cookies);
    console.log('SignUp_Signed Cookies: ', req.signedCookies);
    res.send(JSON.stringify({curr_view: 'home', logged_in: true, user: req.user}));
});

module.exports = router;