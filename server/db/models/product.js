'use strict';
var mongoose = require('mongoose');
var _ = require('lodash');


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
      default: "http://lorempixel.com/300/300/food"
    }]

});

schema.statics.findByCategory = function(cat) {
    return this.find({})
    .populate('categories')
    .then(products => {
      return products.filter(function(el){
      return el.categories[0].name === cat;
      });
    }
  )};

  schema.pre('save', function (next) {
      while (this.picture.length<3) {
          this.picture.push("http://lorempixel.com/300/300/food");
      }
      next();
  });




mongoose.model('Product', schema);
