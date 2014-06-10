
var schema = {
    "$schema": "http://json-schema.org/draft-04/schema#",

    "definitions": {
      "date": {
        "type": "string",
        "format": "date"
      }
    },
    
    "type": "object",       
    "properties": {
        "prefix": { "title":"", type: "string" },
        "firstName": { type: "string" },
        "lastName": { type: "string" },
        "gender": { type: "string", enum: ["m", "f", "o"] },
        "birthDate": { type: "string", format: "date" }
    }
};

var json = {
    "prefix": "Mr.",
    "firstName": "Jason",
    "lastName": "Rowland",
    "gender": "m",
    "birthDate": "1973-09-12",
    "blah": "1973-09-12a"
};

module.exports.json = json;
module.exports.schema = schema;
