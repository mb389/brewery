'use strict';
var mongoose = require('mongoose');
var _ = require('lodash');
var Product = mongoose.model('Product');



var schema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null
    },
    sessionId: {
      type: String, validate: validateUserSession, default: null
    },
    status: {
      type: String, default: 'pending'
    },
    products: [{
      product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', default: null},
      quantity: {type: Number, min: 0, default: null},
      price: {type: Number, min: 0, default: null}
    }],
    //need to add purchase price field
    creationDate: {
      type: Date, default: Date.now
    },
    purchaseDate: {
      type: Date
    },
    subtotal: {
      type: Number
    }
});

function validateUserSession () {
  return this.user || this.sessionId
}

// schema.pre('save', function(next) {
//   if(!this.user && !this.sessionId) {
//     next (new Error('something went wrong'))
//   }
//   next()
// })

schema.pre('save', function(next) {
  var productsInOrder = this.products;
  if(productsInOrder.length !== 0) {
    productsInOrder.forEach(product => {
      if(!product.product || typeof product.quantity !== 'number') {
        next(new Error('something went wrong'))
      }
    })
  }
  next()
})


schema.statics.addOrCreateProduct = function (id, productUpdateObj) {
  //updates quantity and price if product in baseket or adds product
  // var self = this;
  return this.findById(id)
  .then(orderToUpdate => {
    var toUpdate = orderToUpdate.products.filter(productInArray => {
      return productInArray.product.toString() === productUpdateObj.product.toString()
    })
    if(toUpdate.length) {
      toUpdate[0].quantity += productUpdateObj.quantity
    } else {
      orderToUpdate.products.push(productUpdateObj)
    }
    return orderToUpdate.save().then(function(updatedOrder) {
      return updatedOrder
    })
  })
}


schema.methods.purchaseById = function() {
  this.status = 'purchased';
  addPriceToCart();
}


function addPriceToCart () {
  return Promise.all(this.products.map(productInCart => {
    return Product.findById(productInCart.product)
    .then(product => {
      productInCart.price = product.price
      return productInCart.save()
    })
  }))
  .then(arrOfUpdatedProducts => {
    return arrOfUpdatedProducts
  })
}

schema.methods.updateStatus = function(status) {
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
