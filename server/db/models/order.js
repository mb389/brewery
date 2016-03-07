'use strict';
var mongoose = require('mongoose');
var Product = mongoose.model('Product');
var _ = require('lodash');


var schema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null
    },
    sessionId: {
      type: String, default: null
    },
    status: {
      type: String, default: 'pending'
    },
    products: [{
      product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', default: null, required: true},
      quantity: {type: Number, min: 0, default: null, required: true},
      price: {type: Number, min: 0, default: null}
    }],
    creationDate: {
      type: Date, default: Date.now
    },
    purchaseDate: {
      type: Date
    },
    subtotal: {
      type: Number
    },
    guestDetails: {
      firstName: String,
      lastName: String,
      streetAddress: String,
      city: String,
      state: String,
      zipcode: String,
      phone: String
    }
});

schema.pre('validate', function(next) {
  if (this.user || this.sessionId) {
    next();
  } else {
    next(new Error('orders need a sessionId or user'))
  }
})


// schema.pre('save', function(next) {
//   var productsInOrder = this.products;
//   if(productsInOrder.length !== 0) {
//     productsInOrder.forEach(product => {
//       if(!product.product || typeof product.quantity !== 'number') {
//         next(new Error('something went wrong'))
//       }
//     })
//   }
//   next()
// })

function findMatchingProduct (productUpdateObj){
  return this.products.filter(productInArray => {
    return productInArray.product.toString() === productUpdateObj._id.toString();
  })
}

schema.methods.addOrCreateProduct = function (productUpdateObj) {
  //updates quantity and price if product in baseket or adds product
  // var self = this;
  var toUpdate = findMatchingProduct.call(this, productUpdateObj);
  if(toUpdate.length) {
    toUpdate[0].quantity += Number(productUpdateObj.quantity);
  } else {
    this.products.push({
      product: productUpdateObj._id,
      quantity: Number(productUpdateObj.quantity)
    })
  }
  return this.save()
}

schema.methods.removeProduct = function (idToRemove) {
  var idx;
   this.products.forEach((prod, i) => {
    if(prod.product.id === idToRemove.toString()) idx = i;
   })
   this.products.splice(idx, 1);
   return this.save();
}

schema.methods.updateOrder  = function(updatesOrder) {
  // _.merge(this.products, updatesOrder.products); this gives me an error doc validat is not a function
  this.products.forEach(function (prod, i){
    prod.quantity = updatesOrder.products[i].quantity;
  })
  return this.save();
}

function addPriceToCart () {
  return Promise.all(this.products.map(productInCart => {
    return Product.findById(productInCart.product)
    .then(product => {
      productInCart.price = product.price
      return productInCart.save()
    })
  }))
}

schema.methods.purchaseById = function() {
  console.log('heres the og this', this);
  var self = this;
  this.status = 'purchased';
  this.purchaseDate = Date.now();
  addPriceToCart.call(this)
  .then(function(){
    console.log('is this still this', self);
    return self.save();
  })
  //add price to car returns an array of products in cart - should just be then'd off of
}


// schema.methods.updateStatus = function(status) {
//   //notifications on post purchase status, incl. shipping, delivery
//   this.status = status;
//   switch(this.status) {;
//     case "processing":
//       processing(this);
//     case "cancelled":
//       cancelled(this);
//     case "completed":
//       completed(this);
//     default:

//   }
// }

// function processing (order) {

// }


// function cancelled (order) {

// }

// function completed (order) {

// }



mongoose.model('Order', schema);
