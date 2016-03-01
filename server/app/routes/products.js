'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Product = mongoose.model('Product');


router.get('/', (req, res, next) => {
  Product.find()
  .then(products => res.json(products))
  .then(null,next);
});

router.get('/:id', (req, res, next) => {
  Product.findById(req.params.id)
  .then(product => res.json(product))
  .then(null,next);
});

router.post('/', (req, res, next) => {
  Product.create(req.body)
  .then(product => res.json(product))
  .then(null,next);
});

router.put('/:id', (req, res, next) => {
  Product.findBydId(req.params.id)
  .then(Product => {
    Product = req.body;
    Product.save();
    res.json(Product);
  })
  .then(null, next);
});

router.delete('/:id', (req, res, next) => {
  Product.findById(req.params.id)
  .then(Product => {
    Product.remove();
    res.sendStatus(204);
  })
  .then(null, next);
});

module.exports = router;
