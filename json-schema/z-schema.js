var ZSchema = require("z-schema");
var data = require('./data');
var json = data.json;
var schema = data.schema;


console.log("needs further help...")

var validator = new ZSchema({sync: true, strict:true});
validator.validateSchema(schema)
    .then(function(report){
        console.log("done")
    })
    .catch(function(err){
        console.error("my errors...");
        console.error(err.errors);
    })
    
