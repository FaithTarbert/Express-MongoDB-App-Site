

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const hbs = require('hbs');
//hide db connection info
require('dotenv').config();
//for passport
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var createRouter = require('./routes/create');
var detailsRouter = require('./routes/details');
var aboutRouter = require('./routes/about');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var attachRouter = require('./routes/attach');
var deleteRouter = require('./routes/delete');
var editRouter = require('./routes/edit');
var searchRouter = require('./routes/search');

//don't need this route when using button/passport to logout manually
// var logoutRouter = require('./routes/logout');

//require express
var app = express();

//hide mongoose connection using .env file (add to .gitignore)
mongoose.connect(process.env.DB_URI,  {
  dbName: process.env.DB_NAME,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then((res) => console.log('db connected!'))
  .catch((err) => console.log(err));

  //passport config (no platform)
  app.use(require('express-session')({
    secret: process.env.EXP_SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  var User = require('./models/user');
  passport.use(new LocalStrategy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());

// view engine setup to handlebars/hbs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials("./views/partials");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//authentication - not using now
app.use('/users', usersRouter);
app.use('/', indexRouter);
app.use('/create', createRouter);
app.use('/details', detailsRouter);
app.use('/about', aboutRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/accessory/attach', attachRouter);
app.use('/delete', deleteRouter);
app.use('/edit', editRouter);
app.use('/search', searchRouter);
// app.use('/logout', logoutRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('404');
});

module.exports = app;
