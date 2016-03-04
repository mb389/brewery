app.controller('ReviewController', function($scope) {
  $scope.review = {};
  $scope.review.rating = 3;
  $scope.review.isReadonly = false;





})

app.controller('ProductReviewsController', function($scope, productReviews) {
  $scope.productReviews = productReviews;

})
