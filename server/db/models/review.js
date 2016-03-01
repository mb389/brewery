'use strict';
var mongoose = require('mongoose');


var schema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    product: {
      type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    stars: Number,
    content: String

});

schema.statics.findByProduct = function(id) { //all reviews for a given product Id
  mongoose.model('Product').findById(id)
  .then(product => product)
  .then(null,next)
}

mongoose.model('Review', schema);
