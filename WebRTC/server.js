// server.js

//----------------------------------------------------------------------------
// START THE SERVER
//----------------------------------------------------------------------------

// TODO: Cluster
// TODO: How do we hook up events for all sub apps so we can start listening once the databases are done loading

// Peer Server
var PeerServer = require('peer').PeerServer;
var server = new PeerServer({port: 9000, path: '/myapp'});
server.on('connection', function(id) {
    console.log('connection: ' + id);
});

server.on('disconnect', function(id) {
    console.log('disconnect: ' + id);
});


var app = require('./app');
var port = process.env.PORT || 3000;       // set our port
app.listen(port);
console.log('Magic happens on port ' + port);
