let express = require('express');
let router = express.Router();
let Role = require('../model/role');

router.get('/', function(req, res, next) {
  Role.getRoles()
    .then(data => res.send(JSON.stringify(data)))
    .catch(err => res.send(JSON.stringify(err)));
});

module.exports = router;