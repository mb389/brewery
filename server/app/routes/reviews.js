'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Review = mongoose.model('Review');


router.get('/', (req, res, next) => {
  Review.find()
  .then(reviews => res.json(reviews))
  .then(null,next);
});

router.get('/:id', (req, res, next) => {
  Review.findById(req.params.id)
  .then(review => res.json(review))
  .then(null,next);
});

router.get('/product/:productId', (req, res, next) => {
  Review.findByProduct(req.params.productId)
  .then(reviews => res.json(reviews))
  .then(null,next);
});

router.get('/user/:userId', (req, res, next) => {
  Review.findByUser(req.params.userId)
  .then(reviews => res.json(reviews))
  .then(null,next);
});


router.post('/', (req, res, next) => {
  Review.create(req.body)
  .then(review => res.json(review))
  .then(null,next);
});

router.put('/:id', (req, res, next) => {
  Review.findBydId(req.params.id)
  .then(review => {
    review = req.body;
    review.save();
    res.json(Review);
  })
  .then(null, next);
});

router.delete('/:id', (req, res, next) => {
  Review.findById(req.params.id)
  .then(review => {
    review.remove();
    res.sendStatus(204);
  })
  .then(null, next);
});


module.exports = router;
