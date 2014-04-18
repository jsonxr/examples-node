var amqp = require('amqp');
var connection = amqp.createConnection({ host: "localhost", port: 5672 });
connection.on('ready', function () {
  connection.queue("my-queue", { durable: true }, function(queue){
    queue.bind('#'); 
    queue.subscribe(function (message) {
      var encoded_payload = unescape(message.data);
      var payload = JSON.parse(encoded_payload);
      console.log('Recieved a message:' + payload);
    })
  })
})