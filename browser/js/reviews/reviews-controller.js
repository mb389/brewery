app.controller('ReviewController', function($scope) {
  $scope.review = {};
  $scope.review.rating = "";
  $scope.review.isReadonly = false;

})

app.controller('ProductReviewsController', function($scope, productReviews) {
  $scope.productReviews = productReviews;

})
