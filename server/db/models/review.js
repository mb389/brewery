'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    product: {
      type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    stars: {
      type: Number,
      required: true,
      enum: [1,2,3,4,5]
    },
    content: {
      type: String,
      min: 25
    }
});

schema.statics.findByProduct = function(id) { //all reviews for a given product Id
  return this.find({product: id}).exec();
}

schema.statics.findByUser = function(id) { //all reviews for a given product Id
return this.find({user: id}).exec();

}

mongoose.model('Review', schema);
