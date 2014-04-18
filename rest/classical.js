//----------------------------------------------------------------------------
// ECMAScript5 only
//----------------------------------------------------------------------------
"use strict";

var util = require('util');

// Problem all instances share the same data

function Model() {
    console.log("new model")
    this.fields = {};
    this.isDirty = false;
}

function Person() {
    console.log("new person")
    this.fields = {};
    console.log("new person fields = " + this.fields)
}
Person.prototype = new Model();//Object.create(Model);
//Person.constructor = Person

Object.defineProperties(Person, {
    firstName: {
        get: function() {
            return fields['name'];
        }, 
        set: function(value) {
            console.log('setting firstName to ' + value + ' for fields = ' + this.fields)
            fields['name'] = value;
        } 
    }
});


var p = new Person();

var isInherited = (p instanceof Model);
console.log("Model: " + (p instanceof Model));
console.log("Person: " + (p instanceof Person));
console.log("name: " + Person.name);
console.log("Person.fields: " + Person.fields);
console.log("p.fields: " + p.fields);
Person.firstName = 'bob';


console.log('p.name: ' + p.name);
console.log('fields: ' + p.fields);
p.firstName = 'jason';
console.log('firstName: ' + p.firstName);
console.log('fields: ' + p.fields);
console.log('fields[name] = ' + p.fields['name'])
//console.log('isDirty: ' + p.isDirty);