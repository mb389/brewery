
app.directive('productReviews', function(){
  return  {
    restrict: 'E',
    templateUrl: 'js/products/templates/productReviews.html'
  }
});


app.directive('starRating', function(ReviewFactory) {
  return {
    restrict: 'E',
    templateUrl: 'js/products/templates/ratingStars.html',
    controller: 'ProductCtrl',
    scope: {
        ratingValue: '=',
        onRatingSelect: '&',
        read: '='
      },
    link: function(scope, element, attributes) {
      function updateStars() {
        scope.stars = [];
        for (var i = 0; i < 5; i++) {
          scope.stars.push({
            filled: i < scope.ratingValue
          });
        }
      };
      scope.toggle = function(index) {
        if(!scope.read) {
          scope.ratingValue = index + 1;
          scope.onRatingSelect({
            rating: index + 1
          });
        }
      };
      scope.$watch('ratingValue', function(oldValue, newValue) {
        if (newValue) {
          updateStars();
          console.log(oldValue);
        }
      });
    }
  }
})
