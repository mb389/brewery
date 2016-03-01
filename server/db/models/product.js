'use strict';
var mongoose = require('mongoose');


var Product = new mongoose.Schema({
    name: {
      type: String,
      default: "Delicious Beer"
    },
    description: String,
    inStock: Boolean,
    price: {
      type: Number,
      default: 9.99
    }

});
