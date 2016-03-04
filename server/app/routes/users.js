'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var _ = require('lodash');

router.get('/', (req, res, next) => {
  User.find()
  .then(users => {
    res.json(users);
  })
  .then(null, next);
});

router.get('/:id', (req, res, next) => {
  User.findById(req.params.id)
  .then(user => {
    res.json(user);
  })
  .then(null, next);
});

router.get('/:id/orders/pending', (req, res, next) => {
  User.findById(req.params.id).populate('orders').exec()
    .then(user => {
      var pendingOrder = _.find(user.orders, {'status': 'pending'});
      res.json(pendingOrder);
    })
})

router.get('/:id/orders', (req, res, next) => {
  User.findById(req.params.id).populate('orders').exec()
  .then(user => {
    res.json(user.orders);
  })
  .then(null, next);
})

//check admin status, send back 404?
router.get('/:id/isAdmin', (req, res, next) => {
  User.findById(req.params.id)
  .then(user => {
    if(user.isAdmin) res.send(true);
    else res.send(false);
  })
  .then(null, next);
})

router.post('/', (req, res, next) => {
  User.create(req.body)
  .then(user => {
    res.status(201).json(user);
  })
  .then(null, next);
});

router.put('/:id', (req, res, next) => {
  User.findById(req.params.id)
  .then(user => {
    _.merge(user, req.body);
    user.save();
    res.json(user);
  })
  .then(null, next);
});

router.delete('/:id', (req, res, next) => {
  User.findById(req.params.id)
  .then(user => {
    user.remove();
    res.sendStatus(204);
  })
  .then(null, next);
});

module.exports = router;
