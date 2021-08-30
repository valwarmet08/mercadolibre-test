global.config = require('./backend/config.json');
const port = global.config.port || 4000; 

const express = require('express');
const compression = require('compression');
const helmet = require('helmet')
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const cors = require('cors');
const fs = require('fs');
const requestValidateApi = require('./backend/middleware/requestValidateApi');
const sessionChecker = require('./backend/middleware/validateSession');
const Logger = require('./backend/helpers/logger.js');
const ENVIRONMENT = process.env.NODE_ENV || 'development';
const colors = require('colors');

var corsOptions = {
    origin: function (origin, callback) {
        callback(null, true);
    }
}

// Then pass them to cors:
app.use("*", cors(corsOptions));
app.disable('x-powered-by');
app.use( helmet({ contentSecurityPolicy: false }) );
app.set('view engine', 'pug')
app.set('trust proxy', 1) // trust first proxy
app.use(compression());
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({  extended: true })); // to support URL-encoded bodies
app.use(express.static(path.join(__dirname, 'build')));
app.use(cookieParser());// initialize cookie-parser to allow us access the cookies stored in the browser. 


/************************ Setting routes ************************/
var routes = {};
fs.readdirSync(__dirname + "/backend/routes").forEach(function (file) {
    var moduleName = file.split('.')[0];
    routes[moduleName] = require(__dirname + '/backend/routes/' + moduleName);
});
/************************ Setting routes ************************/


app.post('/api/:route/:method', requestValidateApi );
app.get('*',sessionChecker.validateSession, function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

server.listen(port, function (err) {
    Logger.info("App running on port " + port);
    Logger.info("ENVIRONMENT ".green + ENVIRONMENT );
  
});
