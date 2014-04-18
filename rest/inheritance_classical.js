var util = require('util');

function Model(args) {
    if (this instanceof Model) {
        console.log('new Model()')
        this.values = {};
    } else {
        return new Model(args);
    }
}
Model.prototype.toJSON = function() {
    var json = {}
    var f;
    for (f in this.values) {
        value = 
        json[f] = this.values[f];
    }
    return json;
}
Model.prototype.inspect = function() {
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

function Person(props) {
    if (this instanceof Person) {
        if (this.constructor === Person) {
            console.log('class is person');
        }
        console.log('new Person('+props+')')
        Model.call(this, [props]);
    } else {
        console.log('wrapping...')
        return new Person(props);
    }
}
util.inherits(Person, Model);

Person.prototype.schema = ['firstName', 'lastName'];
Object.defineProperty(Person.prototype, 'firstName', { 
    get: function() {
        console.log('get firstName...');
        if (this.values !== undefined) {
            return this.values['firstName']
        } else {
            return undefined;
        }
    }, 
    set: function(value) {
        console.log('set firstName = '+value+'...');
        if (this.values !== undefined) {
            this.values['firstName'] = value;
        }
    } 
});

var Employee = function(props) {
    if (this instanceof Employee) {
        if (this.constructor === Employee) {
            console.log('class is Employee');
        }
        console.log('new Employee('+props+')')
        Person.call(this, [props]);
    } else {
        return new Employee(props);
    }
    
}
util.inherits(Employee, Person);


var Employee = Model.define(Person, {
    constructor: function (props) {
        this.employeeId = 1;
    }
});

// var Person = Object.create(Model);
// Person.schema = ['firstName', 'lastName'];
// 
// var p = Object.create(Person, {
//     values: { enumerable: true, value: {} }
// });

console.log("------------------------------------------------------------------------------")

var p = new Employee({firstName: 'Jason'});
p.lastName = 'Rowland';
p.firstName = 'Jason';

var p2 = new Employee({firstName: 'Erin'});
p2.firstName = 'Erin';
p2.lastName = 'Rowland';

//p.inspect();
console.log(util.inspect(p));
console.log(util.inspect(p2));
