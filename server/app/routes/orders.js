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
  Order.findById(req.params.id)
  .then(order => res.json(order))
  .then(null, next)
})

router.get('/session/:sessionId', (req, res, next) => {
  //get any current pending orders for the current session Id
  Order.findOne({sessionId: req.params.sessionId, status: 'pending'})
  .then(order => res.json(order))
  .then(null, next)
})

//get pending order by user or session
router.get('/user/:userid/session', (req, res, next) => {
  Order.findOne({user: req.params.userid, status: 'pending'})
    .then(order => {
      console.log('ORDER', order);
      if(order) res.json(order)
      else return Order.findOne({sessionId: req.session.id, status: 'pending'})
    })
    .then(sessionOrder => {
      res.json(sessionOrder);
    })
    .then(null, next);
})

router.put('/add/:id', (req, res, next) => {
  //req.body will be the product, new quantity
  Order.addOrCreateProduct(req.params.id, req.body)
  .then(updatedOrder => res.status(202).json(updatedOrder))
  .then(null, next)
})

router.post('/add', (req, res, next) => {
  //req.body will be the productId, quantity to add
    //if no order then create a order
    var newOrder = new Order();
    if (req.user && req.user.id) {
      newOrder.user =req.user._id
    } else {
      newOrder.sessionId = req.session.id
    }
    newOrder.save()
    //then add the products to the order
    .then(order => {
      Order.addOrCreateProduct(order.id, req.body)
      return order
    })
    .then(order => {
      if(req.user) {
        User.findById(req.user.id)
        .then(user => {
          user.orders.push(order._id);
          return order
        })
      }
    })
    .then(order => res.status(201).json(order))
    .then(null, next)
})


router.put('/purchase/:id', (req, res, next) => {
  Order.findById(req.params.id).
  then(order => order.purchaseById())
  .then(order => res.json(order))
  .then(null, next)
})

router.put('/status/:id/:status', (req, res, next) => {
  Order.findById(req.params.id)
  .then(order => order.updateStatus(req.params.status))
  .then(updatedOrder => res.json(updatedOrder))
  .then(null, next)
})


router.delete('/:orderId', (req, res, next) => {
  //delete the order and the delete the order within the user
  Order.remove({_id: req.params.orderId})
  .then(() => {
    //delete the order from the users list of orders
    res.sendStatus(204)
  })
  .then(null, next)
})


router.delete('/:orderId/:userId', (req, res, next) => {
  //delete the order and the delete the order within the user
  Promise.all([
    User.findById(req.params.userId),
    Order.remove({_id: req.params.orderId})
    ])
  .spread(user => {
    //delete the order from the users list of orders
    var newOrders = user.orders.filter((userOrder) => {
      if (String(userOrder) !== req.params.orderId) {
        return userOrder
      }
    })
    user.orders = newOrders
    user.save().then(() => {
      res.sendStatus(204)
    })
  })
  .then(null, next)
})

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
