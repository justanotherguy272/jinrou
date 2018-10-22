var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:id', function (req, res) {
  res.send(JSON.stringify({redirect_to: '/rooms', room_id: req.params.id}));
});

module.exports = router;
