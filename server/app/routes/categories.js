'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Category = mongoose.model('Category');



router.get('/', (req, res, next) => {
  Category.find({})
  .then(cats => res.json(cats))
  .catch(next)
})

router.get('/names', (req, res, next) => {
  Category.getAllUniqueCats()
  .then(cats => res.json(cats))
  .catch(next)
})
