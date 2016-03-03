app.config(function ($stateProvider) {
    $stateProvider.state('ProductReviews', {
        url: '/reviews/:productId',
        templateUrl: 'js/reviews/tempaltes/productReviews.html',
        controller: 'ProductReviewsController',
        resolve: {
          productReviews: function($stateParams, ReviewFactory) {
            return ReviewFactory.getReviewsForProduct($stateParams.productId)
          }
        }
    });
});


app.config(function ($stateProvider) {
    $stateProvider.state('OneReview', {
        url: '/reviews/:reviewId',
        templateUrl: 'js/reviews/review.html',
        controller: 'ProductReviewsController',
        resolve: {
          oneReview: function($stateParams, ReviewFactory) {
            return ReviewFactory.getOneReview($stateParams.reviewId)
          }
        }
    });
});
