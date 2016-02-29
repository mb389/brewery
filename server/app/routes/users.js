'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');

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
    if(user.isAdmin) res.json(user);
    else res.sendStatus(404);
  })
  .then(null, next);
})

router.post('/', (req, res, next) => {
  User.create(req.body)
  .then(user => {
    res.json(user);
  })
  .then(null, next);
});

router.put('/:id', (req, res, next) => {
  User.findBydId(req.params.id)
  .then(user => {
    user = req.body;
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
