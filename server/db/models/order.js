'use strict';
var mongoose = require('mongoose');
var Product = mongoose.model('Product');



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



schema.methods.addOrCreateProduct = function (productUpdateObj) {
  //updates quantity and price if product in baseket or adds product
  // var self = this;
  var toUpdate = this.products.filter(productInArray => {
    return productInArray.product.toString() === productUpdateObj.product.toString()
  })
  if(toUpdate.length) {
    toUpdate[0].quantity += productUpdateObj.quantity
  } else {
    this.products.push(productUpdateObj)
  }
  return this.save()
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
  this.status = 'purchased';
  addPriceToCart.call(this);
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
