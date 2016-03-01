'use strict';
var mongoose = require('mongoose');
var _ = require('lodash');


var schema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null
    },
    anonymousUser: {
      type: String, default: null
      //need to confirm decision on where to save anonymouse
    },
    status: {
      type: String, default: 'inCart'
    },
    products: [{
      product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', default: null},
      quantity: {type: Number, min: 0}
    }],
    purchaseDate: {
      type: Date
    },
    subtotal: {
      type: Number
    }
});


schema.statics.addOrCreateProduct = function (id, productQuantityObj) {
  //adds to quantity of product or creates product and adds
  var self = this;
  return self.findById(id)
  .then(order => {
    if (order) {
      order.products.forEach(product => {
        if (product.product === productQuantityObj.product) product.quantity = productQuantityObj.quantity
      })
      return order;
    } else {
        return order.products.push(productQuantityObj)
    }
  })
}


schema.statics.updateQuantity = function (id, productQuantityObj) {
  //productQuantityObj will be the product and the new quantity
  this.findByIdAndUpdate(id, productQuantityObj, {new: true})
  .then(updatedOrder => updatedOrder)
  //sends back an empty object if no order found
  .then(null, () => {});
}

schema.methods.purchaseById = function() {
  this.status = 'purchased';
  //send confirmation email

  //set off other back end processes
}


schema.methods.updateStatus = function(statusObj) {
  //notifications on post purchase status, incl. shipping, delivery
  this.status = status;
  switch(this.status) {
    case "created":
      created(this);
    case "processing":
      processing(this);
    case "cancelled":
      cancelled(this);
    case "completed":
      completed(this);
    default:

  }
}


function created (order) {

}


function processing (order) {

}


function cancelled (order) {

}

function completed (order) {

}



mongoose.model('Order', schema);
