var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:id', function(req, res) {

    console.log('abc');
    var data = { messages: 'You are in rhis fkn room' + req.params.id};
    res.send(JSON.stringify(data));
});

module.exports = router;
