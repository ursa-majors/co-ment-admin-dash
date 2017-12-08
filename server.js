/* Co/Ment Admin Dashboard
     (c) 2017 - The Ursa Majors
     https://github.com/ursa-majors/co-ment-admin-dash
*/

/* ================================= SETUP ================================= */

const express       = require('express');
const app           = express();
const morgan        = require('morgan');
const bodyParser    = require('body-parser');
const cors          = require('cors');
const path          = require('path');

// passport auth
const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const strategy      = require('./config/auth_strategy');

// db
const db            = require('./config/db');
const mongoose      = require('mongoose');

// db models
const User          = require('./models/user');

// routes
const apiRoutes     = require('./routes/api_routes');
const authRoutes    = require('./routes/auth_routes');
const staticRoutes  = require('./routes/static_routes');

// error handler
const errorHandler  = require('./utils/error_handler');

// port
const port          = process.env.PORT || 8081;


/* ============================= CONFIGURATION ============================= */

// enable logger
app.use(morgan('dev'));

// enable http request body parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

// set static path
app.use(express.static(path.join(__dirname, '/client/dist/')));

/* ================================= CORS ================================= */

app.use(cors());


/* =============================== PASSPORT ================================ */

app.use(passport.initialize());
passport.use(strategy(LocalStrategy, User));


/* ================================ ROUTES ================================= */

app.use('/auth', authRoutes);
app.use('/api', apiRoutes);
app.use(staticRoutes);


/* ============================= ERROR HANDLER ============================= */

app.use(errorHandler);


/* ============================= CONNECT TO DB ============================= */

// new Mongo ( >= 4.11.0 ) connection logic:
mongoose.connect(db.getDbConnectionString(), {
    useMongoClient: true
});

// log mongoose connection errors to console
mongoose.connection.on('error', function(err) {
    console.error('Mongoose connection error: ', err);
});

// tell Mongoose to use Node global es6 Promises
mongoose.Promise = global.Promise;


/* ================================ STARTUP ================================ */

app.listen(port, () => {
    console.log(`Server listening on port ${port}.`);
});
