var mongo = require('mongodb'),
    MongoClient = require('mongodb').MongoClient,
    fs = require('fs'),
    util = require('util'),
    GridStore = mongo.GridStore;



exports.hook_data = function (next, connection) {
    var plugin = this;
    var transaction = connection.transaction;
    transaction.parse_body = 1;
    return next();
}

/**
 * Check to see if user is in mongo.
 * @param next
 * @param connection
 * @param params
 * @returns {*}
 */
exports.hook_rcpt = function(next, connection, params) {
    connection.loginfo(this, "!!!!!!!!!!!!!!!!!!!!!hook_rcpt!!!!!!!!!!!!!!!!!!");
    var rcpt = params[0];
    var user = rcpt.user
    var host = rcpt.host

    // Check for RCPT TO without an @ first - ignore those here
    if (!rcpt.host) {
        connection.loginfo("!!!!!!!!!SKIPPING hook_rcpt because host is null")
        return next();
    }

    if (user === 'jason' && host === 'cluttershield.com') {
        return next(OK);
    } else {
        return next(DENY);
    }
}

// data_post - called at the end-of-data marker
exports.hook_data_post = function (next, connection) {
    var plugin = this;
    var transaction = connection.transaction;
    var ctype_config = this.config.get('attachment.ctype.regex','list');
    var file_config = this.config.get('attachment.filename.regex','list');

    connection.loginfo(plugin, '!!!!!!!!!!!!!!!hook_data_post!!!!!!!!!!!!!!!!!!');

    // Add in any content type from message body
    var body = transaction.body;
    var body_ct;
    //var header = null;

    if (body != null) {
        connection.loginfo(this, '!!!!!!!!!!!!!!!!!!!!!!BODY!!!!!!!!!!!!!!!!!!!!!!!!!')

        var header = (body == null) ? null : body.header.get('content-type');

        if ((body_ct = /^([^\/]+\/[^;\r\n ]+)/.exec(header))) {
            connection.loginfo(this, 'found content type: ' + body_ct[1]);
            //ctypes.push(body_ct[1]);
        }

        connection.loginfo(this, 'body'+body);
        connection.loginfo(this, 'body.is_html = '+body.is_html);
        connection.loginfo(this, 'body.bodytext = '+body.bodytext);

        // MIME parts
        var childIndex = 1;
        var childLength = body.children.length;

        var child = body.children[childIndex];
        connection.loginfo(this, 'children:\n'+util.inspect(body));
        MongoClient.connect('mongodb://localhost:27017/cluttershield_node', function(err, db) {
            var gridStore = new GridStore(db, "test_stream_write", "w");
            gridStore.once('close', function () {
                connection.loginfo(plugin, "!!!!!!!!!!!! JASON WAS HERE ATTACHMENT 2!!!!!!!!!!!!!!!!!!!!!!!!");
                //return next(OK);
                //return next();
            });
            child.attachment_stream.pipe(gridStore);
            //connection.transaction.message_stream.pipe(gridStore);
        });
        return next();


//        for (var c=0; c<body.children.length; c++) {
//            var child = body.children[c];
//            MongoClient.connect('mongodb://localhost:27017/cluttershield_node', function(err, db) {
//                var gridStore = new GridStore(db, "test_stream_write", "w");
//                gridStore.once('close', function () {
//                    connection.loginfo(plugin, "!!!!!!!!!!!! JASON WAS HERE ATTACHMENT 2!!!!!!!!!!!!!!!!!!!!!!!!");
//                    return next(OK);
//                });
//                child.attachment_stream.pipe(gridStore);
//                //connection.transaction.message_stream.pipe(gridStore);
//            });
//
////
////
////            connection.loginfo(this, '!!!!!!!!!!!!!!!!!!!!!!CHILDREN!!!!!!!!!!!!!!!!!!!!!!!!!')
////            var child = body.children[c];
////            connection.loginfo(this, 'child='+ util.inspect(child));
////            connection.loginfo(this, 'child.children[c].header'+ child.header.get('content-type') );
////            connection.loginfo(this, 'child.is_html = '+child.is_html);
////            connection.loginfo(this, 'child.bodytext='+child.bodytext);
////
////            //child.attachment_stream.pipe()
////
////            var child_ct;
////            if ((child_ct = /^([^\/]+\/[^;\r\n ]+)/.exec(body.children[c].header.get('content-type')))) {
////                connection.logdebug(this, 'found content type for child['+c+']: ' + child_ct[1]);
////                //ctypes.push(child_ct[1]);
////            }
//        }
    } else {
        connection.loginfo(this, '!!!!!!!!!!!!!!!!!!!!!!BODY === null!!!!!!!!!!!!!!!!!!!!!!!!!')
        return next();
    }

    // Nothing found

}

exports.hook_queue = function(next, conn) {
    var plugin = this;

    MongoClient.connect('mongodb://localhost:27017/cluttershield_node', function(err, db) {
        var gridStore = new GridStore(db, "test_stream_write", "w");

        // TODO: If Mongo is down, we need to spool it for later...

//        // Create a file reader stream to an object
//        var fileStream = fs.createReadStream("./test/gridstore/test_gs_working_field_read.pdf");
//        gridStore.on("close", function(err) {
//            // Just read the content and compare to the raw binary
//            GridStore.read(client, "test_stream_write", function(err, gridData) {
//                var fileData = fs.readFileSync("./test/gridstore/test_gs_working_field_read.pdf");
//                test.deepEqual(fileData, gridData);
//                test.done();
//            })
//        });
//        // Pipe it through to the gridStore
//        fileStream.pipe(gridStore);

        gridStore.once('close', function () {
            conn.loginfo(plugin, "!!!!!!!!!!!! JASON WAS HERE 2!!!!!!!!!!!!!!!!!!!!!!!!");
            return next(OK);
        });

        conn.transaction.message_stream.pipe(gridStore);
    });
};
