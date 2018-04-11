var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var list = require('./routes/list');
var petList = require('./routes/petList');
var news = require('./routes/news');
var banner = require('./routes/banner');
var nav = require('./routes/nav');

var indexapi = require('./api/index');
var usersapi = require('./api/users');
var listapi = require('./api/list');
var newsapi = require('./api/news');
var petListapi = require('./api/petList');
var bannerapi = require('./api/banner');

var app = express();

// view engine setup
console.log(__dirname)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//访问时可以忽略public的路径，比如index.ejs引入css一样
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'upload')));

app.all("*", function(req,res,next){
    res.header('Access-Control-Allow-Origin',"*");
    next()
});


//分离路由
app.use('/', index);
app.use('/users', users);
app.use('/list', list);
app.use('/petList',petList);
app.use('/news',news);
app.use('/banner',banner);
app.use('/nav',nav);

app.use('/api', indexapi);
app.use('/api/users', usersapi);
app.use('/api/list', listapi);
app.use('/api/news', newsapi);
app.use('/api/petList', petListapi);
app.use('/api/banner', bannerapi);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
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

module.exports = app;
