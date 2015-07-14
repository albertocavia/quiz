var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials = require('express-partials');
var methodOverride = require('method-override');
var session = require('express-session');

var routes = require('./routes/index');

var app = express();

// variables de estadisticas
var contAccesosEstadisticas = 0;
var contAccesosLogin = 0;
var contAciertos = 0;
var contErrores = 0;
exports.contAccesosEstadisticas=contAccesosEstadisticas;
exports.contAccesosLogin=contAccesosLogin;
exports.contAciertos=contAciertos;
exports.contErrores=contErrores;

// time our session
var timeOutSession= (2*60*1000); // 2 minutos
//var timeOutSession= (10*1000);   // 10 segundoa


// test timer
//var timeout = express.timeout // express v3 and below
//var timeout = require('connect-timeout'); //express v4
//app.use(timeout('10s'));
//app.use(haltOnTimedout);



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(partials());

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser('Quiz acz 2015'));
app.use(session());

app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// timeout session
app.use(function(req, res, next) {
    if (req.session.user) {
      if (Date.now() - req.session.user.timeOutSession > timeOutSession) {
        delete req.session.user;
      } else {
        req.session.user.timeOutSession = Date.now();
    }
  }
  next();
});


// Helpers dinamicos:
app.use(function(req, res, next) {

  // guardar path en session.redir para despues de login
  if (!req.path.match(/\/login|\/logout/)) {
    req.session.redir = req.path;
  }

  // Hacer visible req.session en las vistas
  res.locals.session = req.session;
  next();
});


app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            errors: []
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        errors: []
    });
});

/*
function haltOnTimedout(req, res, next){
  if (!req.timedout) next();
//    res.send(408);
}
*/

module.exports = app;
