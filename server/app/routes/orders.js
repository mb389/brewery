'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Promise = require('bluebird');
var Order = mongoose.model('Order');
var User = mongoose.model('User');


router.get('/', (req, res, next) => {
  Order.find({})
  .then(orders => res.json(orders))
  .catch(next)
})

router.get('/:id', (req, res, next) => {
  Order.findById({_id:req.params.id})
  .then(order => res.json(order))
  .then(null, next)
})


router.post('/:id', (req, res, next) => {
  //req.body will be the productId and quantity to add
  Order.addOrCreateProduct(req.params.id, req.body)
  .then(newProductTotal => res.json(newProductTotal))
  .then(null, next)
})

router.put('/:id', (req, res, next) => {
  //req.body will be the product and the new quantity
  Order.updateQuantity(req.params.id, req.body)
  .then(updatedOrder => res.json(updatedOrder))
  .then(null, next)
})

router.put('/:id', (req, res, next) => {
  Order.findById(req.params.id).
  then(order => order.purchase())
  .then(order => res.json(order))
  .then(null, next)
})

router.put('/status/:id/:status', (req, res, next) => {
  Order.findById(req.params.id)
  .then(order => order.updateStatus(req.params.status))
  .then(updatedOrder => res.json(updatedOrder))
  .then(null, next)
})


router.delete('/:cartId/:userId', (req, res, next) => {
  //delete the order and the delete the order within the user
  Promise.all([
    User.findById({_id: req.params.userId}),
    Order.remove({_id: req.params.id})
    ])
  .spread((user, order) => {
    //delete the order from the users list of orders
    user.orders.forEach((userOrder, index, array) => {
      if (userOrder === order._id) array.splice(index, 1)
    })
    res.sendStatus(204)
  })
  .then(null, next)
})




// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
