"use strict";

function Model() {
    this.
}

var Customer = Model.define({
        firtName: { type: String, maxSize: 80 },
        lastName: { type: String, maxSize: 80 },
        lastFirst: { type: String, readOnly: true }
        address: { type: Address }
    }
    
    onChange(['firstName','lastName'], function(){
        this.lastFirst = this.lastName + ', ' + this.firstName;
    });
);

var Customer2 = Model.define({
        "firtName": { "type": "String", "maxSize": 80 },
        "lastName": { "type": "String", "maxSize": 80 }
        "address": { "type": "Address" }
    }
);

exports.Customer = Customer;