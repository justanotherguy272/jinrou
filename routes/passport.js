let express = require('express');
let router = express.Router();
let passport = require('passport');
require('../config/passport')(passport);

router.get('/login', passport.authenticate(), function(req, res) {
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
    res.send(JSON.stringify({curr_view: 'sign_up'}));
});

router.post('/signing_up', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/authen/signup'
}, function(req, res) {
    console.log(req.body.name + ' - ' +req.body.password);
}));

module.exports = router;