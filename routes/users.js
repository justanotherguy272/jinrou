var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  console.log('usersssss')
  var data = {
    messages: "hello" + req.params.id
  };
  res.send(JSON.stringify(data));
});

module.exports = router;
