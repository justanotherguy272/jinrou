let express = require('express');
let router = express.Router();

router.get('/login', function(req, res) {
    res.send({messages: 'Trying to login'})
});

router.post('/logging_in', function(req, res) {
    let recv = JSON.stringify({
        email: req.body.email,
        password: req.body.password
    });
    console.log(recv);
    res.send(recv);
});

module.exports = router;