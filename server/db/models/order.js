'use strict';
var mongoose = require('mongoose');
var Product = mongoose.model('Product');
var _ = require('lodash');
var Promise = require('bluebird')
var dotenv = require('dotenv').config()
var User = mongoose.model('User');


var api_key = process.env.MAILGUN.api_key;
var domain = process.env.MAILGUN.domain;
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});


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


function findMatchingProduct (productUpdateObj){
  return this.products.filter(productInArray => {
    return productInArray.product.toString() === productUpdateObj._id.toString();
  })
}

schema.methods.addOrCreateProduct = function (productUpdateObj) {
  //updates quantity and price if product in baseket or adds product
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

function removeInventory (order) {
  return Promise.map(order.products, eachProduct => {
    return Product.findById(eachProduct.product)
    .then(product => {
      product.quantity -= eachProduct.quantity
      product.save();
    })
    })
}


function purchase(order) {
  let orderSaved;
  order.purchaseDate = Date.now();
  addPriceToCart.call(order)
  .then(() => order.save())
  .then(returnedOrder => {
    orderSaved = returnedOrder;
    removeInventory(returnedOrder)
  })
  .then(() => orderSaved)
}





schema.methods.updateStatus = function(status) {
  console.log("MAILGUN?", this);
  User.findById(this.user)
    .then(user => {
      var data = {
        from: 'Brewery Bros <thebros@brewery.com>',
        to: user.email,
        subject: 'Updates to your order!',
        text: 'Hi,' + user.firstName + '! Your order is now ' + status + '! Please let us know if you have any questions.',
      };
      mailgun.messages().send(data, function (error, body) {
        console.log('we got an email?', body);
      });
    })

  //notifications on post purchase status, incl. shipping, delivery
  this.status = status;
  switch(this.status) {
    case "purchased":
      return purchase(this)
      break;
    case "processing":
      return processing(this);
      break;
    case "cancelled":
      return cancelled(this);
      break;
    case "completed":
      return completed(this);
      break;
  }
}



function processing (order) {
  return order.save()

}


function cancelled (order) {
  return order.save()
}

function completed (order) {
  return order.save()
}



mongoose.model('Order', schema);
