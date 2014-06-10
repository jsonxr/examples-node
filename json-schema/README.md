
# Example how to use json-schema

Check here for comparison in terms of speed and test cases.
<https://rawgit.com/zaggino/z-schema/master/benchmark/results.html>

## Desired Features
*   Node.js - All support Node.
*   browser support
*   validation unrecognized properties. reject objects with properties not defined in schema
    *   jjv: gives option to remove the properties but not reject
    *   jayschema:
    *   tv4:
    *   z-schema:
* date-time validation
    *   jjv:
    *   jayschema:
    *   tv4:
    *   z-schema:
* custom types
    *   jjv:
    *   jayschema:
    *   tv4:
    *   z-schema:
* custom formatters
    *   jjv: yes
    *   jayschema:
    *   tv4:
    *   z-schema:

# Libraries considered

## jayschema

## z-schema

Pro

* Supports compiled schemas
* Validates schemas
* Fast

## tv4
<http://geraintluff.github.io/tv4/>

Pro

* Supports unknown properties (example: Your json has a property called "version", but your schema does not)
* Fast

Con

* Ugly syntax. The validate function requires four ordred parameters if you want to use unknown properties.
    tv4.validate(data, schema, checkRecursive, true);
* No way to simply validate a schema.
* Unclear about async support in Node.js since requires jQuery

## JJV
<https://github.com/acornejo/jjv>

Pro

* Fastest
* Supports custom types (ex: {type: "date" })
* Supports custom formats ({ type: 'string', format: 'hexadecimal' }
* Supports custom checks (i.e., minItems, maxItems, minLength, maxLength, etc.)

Con

* No support for remote schemas (performance & security concerns)
* Fails DateTime validations?
