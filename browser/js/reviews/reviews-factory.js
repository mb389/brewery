app.factory('ReviewFactory', function($http) {
  var RF = {};

  RF.getAllReviews = function() {
    return $http.get('/api/reviews')
    .then(res => res.data)
    .catch(console.error)
  }

  RF.getOneReview = function(reviewId) {
    return $http.get('/api/reviews/'+reviewId)
    .then(res => res.data)
    .catch(console.error)
  }

  RF.getReviewsForProduct = function(productId) {
    return $http.get('/api/reviews/product/'+productId)
    .then(res => res.data)
    .catch(console.error)
  }

  RF.getUserReviews = function(userId) {
    return $http.get('/api/reviews/users/'+userId)
    .then(res => res.data)
    .catch(console.error)
  }

  RF.saveReview = function(reviewObj) {
    $http.post('/api/reviews/')
    .then(res => res.data)
    .catch(console.error)
  }

  RF.updateReview = function(reviewObj) {
    $http.put('/api/reviews/'+reviewObj.id)
    .then(res => res.data)
    .catch(console.error)
  }

  RF.deleteReview = function (reviewId) {
    $http.delete('/api/reviews/'+reviewId)
    .then(res => res.data)
    .catch(console.error)
  }

  return RF;
})

