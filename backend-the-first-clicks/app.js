var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://trkdb:h957DVH6U5EHDnk@cluster0.a26sv.mongodb.net/trkdb?retryWrites=true&w=majority";
const mongoOptions = {
   useUnifiedTopology: true,
      useNewUrlParser: true
}


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const dashboardRouter = require('./routes/dashboard');
const projectsdRouter = require('./routes/projects');
const projectRouter = require('./routes/project');
const validateProjectRouter = require('./routes/validate-project');
const eventRouter = require('./routes/event');

let app

app = express();
app.use(cors());
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/page/1', dashboardRouter);
app.use('/validate/project/:id', validateProjectRouter);
app.use('/project/:id', projectRouter);
app.use('/project', projectsdRouter);
app.use('/event', eventRouter);

const client = new MongoClient(uri,mongoOptions);
client.connect().then((client) => {



    console.log(client,"mongo db conection success");
    const db = client.db('trkdb')
  const eventsCollection = db.collection('events')
  }).catch(err => {
    console.log("connection failure.... ", err, uri);
    console.log("connection errored ", err, uri);
  })

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

