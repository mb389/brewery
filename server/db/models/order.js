'use strict';
var mongoose = require('mongoose');
var _ = require('lodash');


var schema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null
    },
    status: {
      type: String, default: 'inCart'
    },
    products: [{
      product: {type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null},
      quantity: {type: Number, min: 0}
    }],
    purchaseDate: {
      type: Date
    },
    subtotal: {
      type: Number
    },
});




//add an item to a cart

//remove item from a cart


//edit quantities of items in car


//purchase items in the cart

//send confirmation email

//notifications on post purchase status, incl. shipping, delivery


//cancel a


mongoose.model('Order', schema);
