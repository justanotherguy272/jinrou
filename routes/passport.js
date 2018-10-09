var express = require('express');
var router = express.Router();

router.get('/login', function(req, res) {
    res.send({messages: 'Trying to login'})
});

module.exports = router;