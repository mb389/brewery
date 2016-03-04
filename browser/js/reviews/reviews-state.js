app.config(function ($stateProvider) {
    $stateProvider.state('OneReview', {
        url: '/reviews/write',
        templateUrl: 'js/reviews/templates/review.html',
        controller: 'ReviewController'
        // ,
        // resolve: {
        //   oneReview: function($stateParams, ReviewFactory) {
        //     return ReviewFactory.getOneReview($stateParams.reviewId)
        //   }
        // }
    });
});


app.config(function ($stateProvider) {
    $stateProvider.state('ProductReviews', {
        url: 'product/reviews/:productId',
        templateUrl: 'js/reviews/templates/productReviews.html',
        controller: 'ProductReviewsController',
        resolve: {
          productReviews: function($stateParams, ReviewFactory) {
            return ReviewFactory.getReviewsForProduct($stateParams.productId)
          }
        }
    });
});


