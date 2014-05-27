// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
app.use('/', express.static(__dirname + '/public')); // Needed for development

module.exports = app;
