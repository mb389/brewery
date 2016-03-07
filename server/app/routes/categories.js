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


router.post('/', (req, res, next) => {
  Category.create(req.body)
  .then(cat => res.json(cat))
  .catch(next)
})


router.put('/:id', (req, res, next) => {
  Category.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(cat => res.json(cat))
  .catch(next)
})

router.delete('/:id', (req, res, next) => {
  Category.remove({_id:req.params.id})
  .then(cat => res.json(cat))
  .catch(next)
})
