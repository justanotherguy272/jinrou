let express = require('express');
let router = express.Router();
let Room = require('../model/room');

router.get('/:id', function (req, res) {
  res.send(JSON.stringify({redirect_to: '/rooms', room_id: req.params.id}));
});

router.get('/', function (req, res) {
  Room.getRooms()
    .then(data => res.send(JSON.stringify(data)))
    .catch(data => res.send(JSON.stringify(data)));
});

router.post('/create', function(req, res) {
  // Room.createRoom()
  res.send(JSON.stringify('Received'));
});

module.exports = router;
