var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var GridStore = mongo.GridStore;
var fs = require('fs');
var sys = require('sys');
var Buffers = require('buffers');
var headers = {'content-type':'application/json', 'accept':'application/json'};
var transactions = {};

exports.register = function () {
    this.couchURL = this.config.get('mongo.url') || 'mongodb://localhost:27017';
    this.dbPrefix = this.config.get('mongo.dbPrefix') || 'mail_';
};


/**
 * Check to see if user is in mongo.
 * @param next
 * @param connection
 * @param params
 * @returns {*}
 */
exports.hook_rcpt = function(next, connection, params) {
    connection.loginfo("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!hook_rcpt...");
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

function attachment(plugin) {
    return function() {
        var bufs = Buffers()
            , doc = {_attachments: {}}
            , filename
            ;
        return {
            start: function(content_type, name) {
                plugin.loginfo(plugin, "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!start(content_type="+content_type+", name="+name);
                filename = name;
                doc._attachments[filename] = {content_type: content_type.replace(/\n/g, " ")};
            },
            data: function(data) {
                plugin.loginfo(plugin, "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!data("+data+")");
                bufs.push(data);
            },
            end: function() {
                plugin.loginfo(plugin, "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!end()");
                if(filename) doc._attachments[filename]['data'] = bufs.slice().toString('base64')
            },
            doc: function() {
                plugin.loginfo(plugin, "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!doc()")
                return doc
            }
        }
    }();
}

exports.hook_data = function (next, connection) {
    var plugin = this;
    this.loginfo("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!hook_data...");
    connection.transaction.parse_body = 1;
    var attach = transactions[connection.transaction.uuid] = attachment(plugin);
    connection.transaction.attachment_hooks(attach.start, attach.data, attach.end);
    next();
}

function extractChildren(children) {
    return children.map(function(child) {
        var data = {
            bodytext: child.bodytext,
            headers: child.header.headers_decoded
        }
        if (child.children.length > 0) data.children = extractChildren(child.children);
        return data;
    })
}

function parseSubaddress(user) {
    var parsed = {username: user};
    if (user.indexOf('+')) {
        parsed.username = user.split('+')[0];
        parsed.subaddress = user.split('+')[1];
    }
    return parsed;
}

exports.hook_queue = function(next, connection) {
    connection.loginfo("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!hook_queue...");
    var plugin = this;
    var common = transactions[connection.transaction.uuid].doc()
        , body = connection.transaction.body
        , docCounter = 0
        , baseURI = this.couchURL + "/" + this.dbPrefix
        ;
    connection.logdebug(JSON.stringify(connection.transaction.rcpt_to));
    common['headers'] = body.header.headers_decoded;
    common['bodytext'] = body.bodytext;
    common['content_type'] = body.ct;
    common['parts'] = extractChildren(body.children);

    var dbs = connection.transaction.rcpt_to.map(function(recipient) {
        docCounter++;
        connection.loginfo(plugin, "recipient:"+recipient);
        var db = {doc: {tags: []}};
        var user = parseSubaddress(recipient.user);

        db.uri = baseURI + user.username;
        db.doc.recipient = recipient;
        if (user.subaddress) db.doc.tags.push(user.subaddress);
        //db.doc = _.extend({}, db.doc, common);
        return db;
    })

    function resolve(err, resp, body) {
        docCounter--;
        if (docCounter === 0) {
            delete transactions[connection.transaction.uuid];
            next(OK);
        }
    }




    var child = body.children[1];
    MongoClient.connect('mongodb://localhost:27017/cluttershield_node', function(err, db) {
        var gridStore = new GridStore(db, "test_stream_write", "w");
        gridStore.once('close', function () {
            connection.loginfo(plugin, "!!!!!!!!!!!! JASON WAS HERE ATTACHMENT 2!!!!!!!!!!!!!!!!!!!!!!!!");
            return next(OK);
        });
        child.attachment_stream.pipe(gridStore);
        //connection.transaction.message_stream.pipe(gridStore);
    });


    dbs.map(function(db) {
        plugin.loginfo(this, "doc:"+ JSON.stringify(db.doc));
        resolve();
    });



//    dbs.map(function(db) {
//        var message = {uri: db.uri, method: "POST", headers: headers, body: JSON.stringify(db.doc)};
//        request(message, function(err, resp, body) {
//            if (resp.statusCode === 404) {
//                var body = JSON.parse(body);
//                if (body.error === "not_found" && body.reason === "no_db_file") {
//                    request({method: "PUT", uri:db.uri, headers:headers}, function(err, resp, body) {
//                        connection.logdebug(body);
//                        if (JSON.parse(body).ok === true) {
//                            request(message, resolve);
//                        } else {
//                            // TODO this sucks :D
//                            next(DENY, "couch error " + body);
//                        }
//                    })
//                }
//            } else {
//                resolve(err, resp, body);
//            }
//        });
//    });

};
