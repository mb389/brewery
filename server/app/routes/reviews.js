'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Review = mongoose.model('Review');
var _ = require('lodash');
var User = mongoose.model('User');

router.param('id',(req,res,next, id) => {
  Review.findById(id)
  .populate('user')
  .then(review => {
    req.review = review
    next();
  })
  .then(null,next);
})

router.get('/', (req, res, next) => {
  Review.find()
  .populate('user')
  .then(reviews => res.json(reviews))
  .then(null,next);
});

router.get('/:id', (req, res, next) => {
  res.json(req.review)
});

router.get('/product/:productId', (req, res, next) => {
  Review.findByProduct(req.params.productId)
  .then(reviews => {
    Promise.all(reviews.map(function(el) {
      return User.findById(el.user)
      .then(result => {
        el.user=result;
        return el;
      })
    }))
    .then(updatedReviews => res.json(updatedReviews))
  })
  .then(null,next);
});

router.get('/user/:userId', (req, res, next) => {
  Review.findByUser(req.params.userId)
  .then(reviews => res.json(reviews))
  .then(null,next);
});


router.post('/', (req, res, next) => {
  Review.create(req.body)
  .then(review => {
    review.user=req.user._id;
    return review.save();
  })
  .then(savedRev => res.json(savedRev))
  .then(null,next);
});

router.put('/:id', (req, res, next) => {
  _.merge(req.review,req.body);
  req.review.save()
  .then(function() {
    res.json(req.review);
    next();
  });
});

router.delete('/:id', (req, res, next) => {
  // Review.findById(req.params.id)
  // .then(review => {
  //   review.remove();
  //   res.sendStatus(204);
  // })
  // .then(null, next);


});


module.exports = router;
