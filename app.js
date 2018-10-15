let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let bodyParser = require('body-parser');
const mysql      = require('mysql');
let app = express();
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let roomsRouter = require('./routes/rooms');
let passportRouter = require('./routes/passport');
global.db = require('./config/database');
let user = require('./db/user')(mysql);
let User = require('./model/user');


//TODO mysql
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users/', usersRouter);
app.use('/rooms/', roomsRouter);
app.use('/authen/', passportRouter);

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

let http = require('http');

module.exports = app;
let server = http.createServer(app);
server.listen(4000);
User.createUser('duc11', '123123');
User.createUser('duc21', '123123');
User.getUser(2);