'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var _ = require('lodash');
var User = mongoose.model('User');
var Store = mongoose.model('Store');


router.get('/:id', (req, res, next) => {
  Store.findById(req.params.id).populate('owner')
  .then((store) => {
    res.json(store)
  })
  .then(null, next)
})

module.exports = router;
