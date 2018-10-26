let express = require('express');
let router = express.Router();
let Room = require('../model/room');
let RoomUser = require('../model/room_user');
let Game = require('../model/game');
let GameRole  = require('../model/game_role');
router.get('/:id', function (req, res) {
  RoomUser.createNewRoomUser(req.params.id, req.user.id)
    .then(created => {
      Room.getRoomInfo(req.params.id)
        .then(data => {
          Room.getRoomUserList(req.params.id)
            .then(userlist => {
              res.send(JSON.stringify({
                room: data,
                users: userlist
              }))
            })
            .catch(err => res.send(JSON.stringify(err)));
        })
        .catch(err => res.send(JSON.stringify(err)));
    })
    .catch(err => res.send(JSON.stringify(err)));
});

router.get('/', function (req, res) {
  Room.getRooms()
    .then(data => res.send(JSON.stringify(data)))
    .catch(data => res.send(JSON.stringify(data)));
});

router.post('/create', function(req, res) {
  Room.createRoom(req.body.name, req.user.name, req.user.id, req.body.capacity, req.body.password)
    .then(room_data => {
      RoomUser.createNewRoomUser(room_data.insertId, req.user.id)
        .then(data => {
          res.send(JSON.stringify({redirect: '/room/' + room_data.insertId}))
        })
        .catch(err => res.send(JSON.stringify(err)))
    })
    .catch(err => res.send(JSON.stringify(err)));
});

router.post('/game_create', function(req, res, next) {
  Game.createGame(req.body.room_id)
    .then(game_id => {
      console.log('created room and sent to router');
      GameRole.createGameRoles(req.body.roles)
        .then()
        .catch()
    })
    .catch(err => res.send(JSON.stringify(err)));
});

module.exports = router;
