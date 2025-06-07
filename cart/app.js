var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport =require('passport');
var flash=require('connect-flash');
var {body,validationResult}=require('express-validator');
var session=require('express-session');
var indexRouter = require('./routes/index');
var handlebars=require('express-handlebars')
var mongoose=require('mongoose');

var router=require('./routes/index');
var userRouter=require('./routes/user');
require('./config/passport');

mongoose.connect('mongodb://127.0.0.1:27017/cart',{ useNewUrlParser: true, useUnifiedTopology: true }).then(()=>console.log("Connected to mongoDB")).catch(err=>console.error('Mongo DB connection error:',err));

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs',handlebars.engine({defaultLayout:'layout',extname:'.hbs'}))
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret:"my",resave:false,saveUninitialized:false}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user',userRouter);

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
  res.render('error');
});

module.exports = app;
console.log("hoiiiiiiiii");