const config = require('../config/development');
const session = require('express-session');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const cors = require('cors');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const utils = require('./lib/utils');
// Add helmet package in order to secure express
const helmet = require('helmet');

const port = config.SERVER_PORT

// Get all mongo parameters from env config
const mongoUsername = config.mongodb.username;
const mongoPwd = utils.decryptText(config.mongodb.pwd);
const mongoHost = config.mongodb.host;
const mongoPort = config.mongodb.port;
const mongoDatabase = config.mongodb.database;

// Set mongoDB URL
const mongoURL = `mongodb://${mongoUsername}:${mongoPwd}@${mongoHost}:${mongoPort}/${mongoDatabase}`;
console.log(mongoURL)
mongoose.set('useCreateIndex', true)
mongoose.set('useNewUrlParser', true)

mongoose.connect(mongoURL, function(err) {
    if (err) throw err;
});

// If the connection throws an error
mongoose.connection.on('error', function(err) {
    console.log('Mongoose default connection error: ' + err);

    // Exit without error in order to restart docker container
    process.exit(0);
});
// When the connection is disconnected
mongoose.connection.on('disconnected', function() {
   console.log('Mongoose default connection disconnected');
    // Exit without error in order to restart docker container
   process.exit(0);
});
// If the Node process ends, close the Mongoose connection

process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('Mongoose default connection disconnected through app termination');
        // Exit without error in order to restart docker container
        process.exit(0);
    });
});

mongoose.connection.once('open', function() {
    console.log(new Date()+ ': Connected to mongodb...');
});

let sessionOptions = {
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
};
 
// Add cors middleware in order to allow just the origin domain
// for security reasons
app.use(cors({
    origin: [  'http://localhost' , 'http://localhost:4200' ],
}));

app.use(session(sessionOptions));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}))

// parse application/json
app.use(bodyParser.json())

// Limit maximum size of payload for HTTP body in body in express
app.use(bodyParser.json({
  limit: config.security.maxLimitPayload
}));
// Add helmet middleware for securing HTTP response
app.use(helmet());

// Enable trust proxy in order to get real client IP address instead of
// nginx reverse proxy IP address. This is useful for security in blacklist
// of IP addresses
app.set('trust proxy', 2);


// define routes
const router = express.Router();
require('./routes/index.js')(router);


router.route('/').get(function (req, res, next) {
    res.json({
        "message": "Blockchain REST API"
    });
});

app.use('/api/v1', router);


  // listen for requests
  const server = app.listen(config.SERVER_PORT, "0.0.0.0", function() {
    console.log(new Date())
    console.log(`Connected on port ${config.SERVER_PORT}`)


});
server.on('close', function() {});
return server;
 
 

 