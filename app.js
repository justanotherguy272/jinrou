let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let bodyParser = require('body-parser');
const mysql = require('mysql');
let app = express();
global.db = require('./config/database');
let user = require('./db/user')(mysql);
let User = require('./model/user');
let passport = require('passport');
let Room = require('./model/room');
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let roomsRouter = require('./routes/rooms');
let rolesRouter = require('./routes/roles');
let passportRouter = require('./routes/passport');
require('./config/passport')(passport, User);
const session = require('express-session');
let http = require('http');
let server = http.createServer(app);
server.listen(4000);
let io = require('socket.io')(server);
//TODO mysql
require('./db/game')(mysql);
require('./db/round')(mysql);
require('./db/role')(mysql);
require('./db/room')(mysql);
require('./db/game_role')(mysql);
require('./db/game_round')(mysql);
require('./db/room_user')(mysql);

//model
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser({secret: 'cat'}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static("public"));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users/', usersRouter);
app.use('/rooms/', roomsRouter);
app.use('/authen/', passportRouter);
app.use('/roles/', rolesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

io.on('connection', (socket) => {
  socket.emit('id', socket.id)
  io.sockets.emit('noti', socket.id + 'connected!')
  socket.on('disconnect', () => {
    io.sockets.emit('noti', socket.id + 'disconnected!')
  })
});

module.exports = app;