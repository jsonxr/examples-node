//----------------------------------------------------------------------------
// ECMAScript5 only
//----------------------------------------------------------------------------
"use strict";

var util = require('util');

//----------------------------------------------------------------------------
// Field
//----------------------------------------------------------------------------

var Field = {
    define: function(name, props) {
        function defineField(fieldName, fieldDef) {
            if (props[fieldName] !== undefined) {
                if (fieldDef === undefined || fieldDef === null) {
                    fieldDef = { enumerable: true, value: props[fieldName] }
                }
                Object.defineProperty(f, fieldName, fieldDef);
            }
        }
        var f = Object.create(Object);
        var fieldDefs = {
            'name':null, 
            'type':null, 
            'value':null, 
            'readOnly':null, 
            'max':null, 
            'min':null};
        for (var fieldName in fieldDefs) {
            defineField(fieldName, fieldDefs[fieldName])
        }
        return f;
    }
}


//----------------------------------------------------------------------------
// Model
//----------------------------------------------------------------------------


function createProperty(key, props) {
    var def = {
        enumerable: true,
//        writable: true,
        configurable: true
    };
    
    // Function
    if (props instanceof Function) {
        def.value = props;
        return def;
    }
    
    // Property
    if (props.get != null) {
        var func = props.get;
        def.get = function() {
            if (this.fields !== undefined) {
                func.apply(this, []);
            }
        }
    } else {
        def.get = function() {
            if (this.fields !== undefined) {
                return this.fields[key];                
            }
        }
    }

    // Setter
    if (props.set != null) {
        var func = props.set;
        def.set = function(value) {
            this.isDirty = true;
            func.apply(this, [value]);
        }
    } else {
        def.set = function(value) {
            this.isDirty = true;
            this.fields[key] = value;
        }
    }
    return def;
}

var Model = {
    isDirty: false,
    inspect: function(obj, name) {
        if (name === undefined || name === null) {
            name = ''
        }
        console.log("");
        console.log("");
        console.log("------------------------------------------------------------------------------")
        console.log(" Inspect " + name)
        console.log("------------------------------------------------------------------------------")
        console.log("object = " + util.inspect(obj));
        if (obj.schema !== undefined) {
            console.log("schema = " + util.inspect(obj.schema));
        }
        console.log("------------------------------------------------------------------------------")
        console.log("");
        console.log("");
    },
    define: function(parent, props) {
    
        var key;
        
        if (parent == null) {
            parent = Model;
        }

        var schema = {};
        if (parent.schema !== undefined) {
            for (var field in parent.schema) {
                schema[field] = parent.schema[field];
            }
            console.log('using inherited schema')
        }
        
        // Set the instances
        var defs = {};
        for (key in props) {
            if (props.hasOwnProperty(key)) {
                var value  = props[key];
                if (! (value instanceof Function)) {
                    schema[key] = Field.define(key, value);
                }
                defs[key] = createProperty(key, value);
            }
        }
        var o = Object.create(parent);
        Object.defineProperties(o, defs);
        delete o.schema
        Object.defineProperty(o, 'schema', { value: schema } );
        return o
    },
    create: function(args) {
        console.log('Creating')
        var obj = Object.create(this, {
            fields: { writable: false, value: {} }
        });
        return obj;
    }
}

var Person = Model.define(null, {
    prefix: { type: 'string', max: 10 },
    firstName: { type: 'string', max: 80 },
    lastName: { type: 'string', max: 80 },
    age: { type: 'int', min: 0, max: 120 },
    phone: { type: 'string', 
        set: function(value) {
            this.fields['phone'] = this.removeDigits(value);
        }
    },
    firstLast: { type: 'string', 
        get: function() {
            return this.fields['firstName'] + ' ' + this.fields['lastName'];
        }
    },
    removeDigits: function(value) {
        return value.replace(/\D/g,'');
    }
});
Model.inspect(Person, 'Person')

var Customer = Model.define(Person, {
    type: { type: 'string', value: 'Customer', readOnly: true },
    customerId: { type: 'string' }
});
Model.inspect(Customer, 'Customer')

var p = Person.create();
p.id = 1;
p.firstName = 'Jason';
p.lastName = 'Rowland';
p.bob = 'bob'
p.phone = '303-829-0130';
p.isDirty = true;

console.log('----------------------p----------------------------');
Model.inspect(p, 'p');
console.log(JSON.stringify(p));
console.log(p.phone);
console.log(p.isDirty);
