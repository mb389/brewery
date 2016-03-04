'use strict';
var mongoose = require('mongoose');


var schema = new mongoose.Schema({
    name: {
      type: String,
      default: "Delicious Beer",
      required: true
    },
    description: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    categories: [{
      type: mongoose.Schema.Types.ObjectId, ref: 'Category',
      required: true
    }],
    price: {
      type: Number,
      default: 9.99
    },
    picture: [{
      type: String,
      default: "http://lorempixel.com/400/200/"
    }]

});

schema.statics.findByCategory = function(cat) {
    return this.find({
        categories: {
            $in: [cat]
        }
    }).exec();
};



mongoose.model('Product', schema);
