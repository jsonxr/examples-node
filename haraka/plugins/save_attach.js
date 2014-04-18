var fs = require('fs');
var util = require('util');

/**
 * Check to see if user is in mongo.
 * @param next
 * @param connection
 * @param params
 * @returns {*}
 */
exports.hook_rcpt = function(next, connection, params) {
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


var fs = require('fs');

/**
 * Check to see if user is in mongo.
 * @param next
 * @param connection
 * @param params
 * @returns {*}
 */
exports.hook_rcpt = function(next, connection, params) {
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

exports.hook_data = function (next, connection) {
    // enable mail body parsing
    connection.transaction.parse_body = 1;
    connection.transaction.attachment_hooks(
        function (contentType, fileName, body, stream) {
            start_att(connection, contentType, fileName, body, stream)
        }
    );
    next();
}

function start_att (connection, contentType, fileName, body, stream) {
    connection.loginfo("Got attachment: " + contentType + ", " + fileName + " for user id: " + connection.transaction.notes);
    connection.transaction.notes.attachment_count++;

    stream.connection = connection; // Allow backpressure
    stream.pause();

    var tmp = require('tmp');
    var user = connection.transaction.rcpt_to
    connection.loginfo("-----------------------------------------");
    connection.loginfo(util.inspect(user[0]));
    var username = user[0].user
    connection.loginfo(util.inspect(username));

    //var currentAttachment = '/tmp/mail/' + uid + '-' + (filename || (id++ + '.txt'));
    var transactionUuid = connection.transaction.uuid
    tmp.file(function (err, path, fd) {
        connection.loginfo("Got tempfile: " + path + " (" + fd + ")");
        var ws = fs.createWriteStream('/tmp/mail/'+username+'_'+transactionUuid+'_'+fileName);
        stream.pipe(ws);
        stream.resume();
        ws.on('close', function () {
            connection.loginfo("End of stream reached");
            fs.fstat(fd, function (err, stats) {
                connection.loginfo("Got data of length: " + stats.size);
            });
        });
    });
}



