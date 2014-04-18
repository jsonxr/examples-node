var util = require('util');

var Model = {
    // inspect: function() {
    //     var f;
    //     for (f in this) {
    //         console.log(f + ' = ' + this[f]);
    //     }
    // },
    toJSON: function toJSON() {
        var json = {}
        var f;
        for (f in this.values) {
            value = 
            json[f] = this.values[f];
        }
        return json;
    },
    init: function init() {
    },
    inspect: function inspect() {
        function wrap(s, f, value) {
            if (s !== '{') {
                s = s + ',';
            }
            if (typeof value === 'function') {
                s = s + ' ' + f + ": [Function]";
            } else {
                s = s + ' ' + f + ": '" + value + "'";
            }
            return s;
        }
        var f;
        var s = '{';
        for (f in this) {
            if (f !== 'values') {
                s = wrap(s, f, this[f]);
            }
        }
        for (f in this.values) {
            s = wrap(s, f, this.values[f]);
        }
        s = s + ' }';
        return s
    }
}


var Person = Object.create(Model);
Person.schema = ['firstName', 'lastName'];
Person.create = function create() {
    var person = Object.create(this);
    person.values = {};
    return person;
}
Object.defineProperty(Person, 'firstName', { 
    get: function get() {
        console.log('get firstName...');
        return this.values['firstName']
    }, 
    set: function set(value) {
        console.log('set firstName = '+value+'...');
        this.values['firstName'] = value;
    } 
});

var Employee = Object.create(Person);
Employee.create = function create() {
    var person = Object.create(this);
    Person.create(this)
}

//var p = Object.create(Person, { values: { enumerable: true, value: {} } });
var p = Employee.create();

console.log("------------------------------------------------------------------------------")
p.lastName = 'rowland';
p.firstName = 'Jason';
//p.inspect();
console.log(util.inspect(p));
//console.log(JSON.stringify(p));
//console.log(util.inspect(p, false, null));
//console.log(JSON.stringify(p));
var jason = {
    firstName: 'Jason',
    lastName: 'Rowland2344',
    func: function() { console.log('hi')}
}
console.log(util.inspect(jason));
