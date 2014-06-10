var tv4 = require("tv4");
var data = require('./data');
var json = data.json;
var schema = data.schema;


console.log("Can't even get this to work...")

var result = tv4.validateResult(json, schema, false, true);
if (result.valid) {
    console.log("success, should have failed.");
} else {
    console.error(result.error);
}
