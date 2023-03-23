/**
 * Slantapp code and properties {www.slantapp.io}
 */
let express = require('express');
let path = require('path');
let cors = require('cors');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let errorHandler = require('./middleware/middleware.error');
let {errorHandle} = require('./core');

let indexRouter = require('./routes/index');
let frontendRouter = require('./routes/route.front');
let authRouter = require('./routes/route.auth');
let usersRouter = require('./routes/route.user');
let adminRouter = require('./routes/route.admin');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//enable cross origin
//set security guard
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * list of routes
 */
app.use('/api/', indexRouter);
app.use('/api/v1/front', frontendRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', usersRouter);
app.use('/api/v1/admin', adminRouter);
//after all route, show 404
app.use('*', (req, res)=>{
  throw new errorHandle("Resource not found", 404);
})
//Add custom error handling controller
app.use(errorHandler);
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });
process.on('uncaughtException', function (err) {
  console.error(err);
  console.log("Node NOT Exiting...");
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
