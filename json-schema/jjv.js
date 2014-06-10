//----------------------------------------------------------------------------
// jjv
// https://github.com/acornejo/jjv
//----------------------------------------------------------------------------

//----------------------------------------------------------------------------
// Data
//----------------------------------------------------------------------------
var data = require('./data');
var schema = data.schema;
var json = data.json;

//----------------------------------------------------------------------------
// Validator
//----------------------------------------------------------------------------
var jjv = require('jjv');
var validator = jjv();
// Set validator options
var options = validator.defaultOptions;
options.checkRequired = true; // If true it reports missing required properties, otherwise it allows missing required properties. Default=true
options.useDefault = false; // If true it modifies the object to have the default values for missing non-required fields. Default=false
options.useCoerce = false; // If true it enables type coercion where defined. Default=false
options.removeAdditional = true; // If true it removes all attributes of an object which are not matched by the schema's specification. Default=false

//----------------------------------------------------------------------------
// Perform validation
//----------------------------------------------------------------------------
var errors = validator.validate(schema, json);
if (!errors) {
    console.error('!!! Should have failed but didn\'t.');
} else {
    console.error('Failed with error object ' + JSON.stringify(errors));
}
