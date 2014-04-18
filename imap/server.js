var ImapServer = require('imap-server');
var server = ImapServer();


var WrapAuthPlain = require('imap-server/util/auth_plain_wrapper');

var auth_plain = WrapAuthPlain(function(connection, username, password, next) {
    if(username == "jason@cluttershield.com" && password == "secret") {
        next(null, 'OK');
    }
    else {
        next(null, 'NO');
    }
});


// use plugin
var plugins = require('imap-server/plugins');
server.use(plugins.debug);
server.use(plugins.announce);
server.use(plugins.starttls, {
    /* mandatory hash of options for crypto.createCredentials
     * http://nodejs.org/api/crypto.html#crypto_crypto_createcredentials_details
     * with at least key & cert
     */
    key: '-----BEGIN PRIVATE KEY-----\n' +
'MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAK6d967ONg5huECG\n' +
'3zRS/qQNup14p3/SfLa2op4O2KgoRCz7GExKas4CM+jOn7KhqWyNOfzAVcgA7b+j\n' +
'6n2zsXue64DhTCxLQMoWk53e5mMG/PNOq+q42LTa4Y46CUGuhx08ENa/oCaXJPji\n' +
'Ipb0NdLaCrXI6r0ghFRyKMzRVEhTAgMBAAECgYBMDi/wao7u6q83I8eaYb/ZssUi\n' +
'i4fhS8vYRWpFD9BcRdWUBfYKXKtyeVEkyMKUKofB6S1lolx6lbT4MKwU/iyCJFaI\n' +
'aKgA1vGiD7iY4JgEtMLxzvJTdSiN4BvVcnFjrlzidYudVsoqfk6GgpNXnE9HT+RA\n' +
'QJg9mrjUL3BfqiiAgQJBANzMSxDjL4Qt8THyh10bVNYpSlOw5UDBkBSt2P4fOWW7\n' +
'X5HRlOdoJ7buG5zB8YjIPWLxE5gxMx4FW7HLVmkfPkECQQDKdNUya8ERM4lggunH\n' +
'yF8IbYGOhpdhAYMGaucfR6a6vfC1bg4H+Gq01aG4eltKc9+/g5oFh25zVMkgm5pY\n' +
'40mTAkAyhN/MDl8p3CUqq3ZDXGSN18a03W2m4mLoCFr00goc98FHKO/r/o3Psi1J\n' +
'MarlBAPfpo84LFGo1csEJCUySj7BAkEAknyEgg37TPHoNX+jnZ06PcPWGQUDZPoO\n' +
'Dses4TIbzkR+dRfjaRryQlPMxskpYq6Ct3SGLff3D9XKDSDpReV2pwJBAJvtGxqP\n' +
'oignGr9UiPm0AWjFRfhe1iX8FenIrnw0DawxGvZq7sHpDFcFT+/TB9Scb0c1kxOC\n' +
'lADRMRscPJwWNxo=\n' +
'-----END PRIVATE KEY-----',
    cert: '-----BEGIN CERTIFICATE-----\n' +
'MIIC8jCCAlugAwIBAgIJAOyA5hvZ2Cu4MA0GCSqGSIb3DQEBBQUAMIGRMQswCQYD\n' +
'VQQGEwJVUzERMA8GA1UECAwIQ29sb3JhZG8xDzANBgNVBAcMBkRlbnZlcjEbMBkG\n' +
'A1UECgwSQ2x1dHRlclNoaWVsZCwgTExDMRowGAYDVQQDDBFjbHV0dGVyc2hpZWxk\n' +
'LmNvbTElMCMGCSqGSIb3DQEJARYWaW5mb0BjbHV0dGVyc2hpZWxkLmNvbTAeFw0x\n' +
'MzExMjcwODUwNDlaFw0xOTExMjYwODUwNDlaMIGRMQswCQYDVQQGEwJVUzERMA8G\n' +
'A1UECAwIQ29sb3JhZG8xDzANBgNVBAcMBkRlbnZlcjEbMBkGA1UECgwSQ2x1dHRl\n' +
'clNoaWVsZCwgTExDMRowGAYDVQQDDBFjbHV0dGVyc2hpZWxkLmNvbTElMCMGCSqG\n' +
'SIb3DQEJARYWaW5mb0BjbHV0dGVyc2hpZWxkLmNvbTCBnzANBgkqhkiG9w0BAQEF\n' +
'AAOBjQAwgYkCgYEArp33rs42DmG4QIbfNFL+pA26nXinf9J8traing7YqChELPsY\n' +
'TEpqzgIz6M6fsqGpbI05/MBVyADtv6PqfbOxe57rgOFMLEtAyhaTnd7mYwb8806r\n' +
'6rjYtNrhjjoJQa6HHTwQ1r+gJpck+OIilvQ10toKtcjqvSCEVHIozNFUSFMCAwEA\n' +
'AaNQME4wHQYDVR0OBBYEFLK9ZQTxatR7B6WoL8ge40m3iP2qMB8GA1UdIwQYMBaA\n' +
'FLK9ZQTxatR7B6WoL8ge40m3iP2qMAwGA1UdEwQFMAMBAf8wDQYJKoZIhvcNAQEF\n' +
'BQADgYEAWAPHblfPoKcBGa05rDchq/VEdYMCJIE9qa1G5C1NSc4MoskkAxDd3jSV\n' +
'6M6GoaZkc/kOOasiclfzeFmT4k098quS+3+JjUH6K50mfE3fIoTIQv8wpuonOYlb\n' +
'CoFDvU4r+w1ERudhThNeHVHCSQ3zO6ASVvj2DUdWa62KTtNU7ZQ=\n' +
'-----END CERTIFICATE-----'
});
/* use more builtin or custom plugins... */
server.use(auth_plain);

var net = require('net');
net.createServer(server).listen(process.env.IMAP_PORT || 143);