'use strict';
var mongoose = require('mongoose');


var schema = new mongoose.Schema({
    name: {
      type: String,
      default: "Delicious Beer"
    },
    description: String,
    inStock: Boolean,
    price: {
      type: Number,
      default: 9.99
    },
    reviews: [{
      type: mongoose.Schema.Types.ObjectId, ref: 'Review'
    }]

});

mongoose.model('Product', schema);
