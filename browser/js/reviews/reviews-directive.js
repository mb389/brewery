app.directive('reviewBox', function(ReviewFactory) {
  return {
    restrict: 'E',
    templateUrl: 'js/reviews/templates/reviewBox.html',
    scope: {
      review: '=',
    }
  }
})


app.directive('reviewWriter', function(ReviewFactory) {
  return {
    restrict: 'E',
    templateUrl: 'js/reviews/templates/reviewWriter.html',
  }
})



app.directive('starRating', function(ReviewFactory) {
  return {
    restrict: 'E',
    templateUrl: 'js/reviews/templates/ratingStars.html',
    controller: 'ReviewController',
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





