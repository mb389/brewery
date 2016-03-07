
app.directive('productReviews', function(){
  return  {
    restrict: 'E',
    templateUrl: 'js/products/templates/productReviews.html'
  }
});


app.directive('starRating', function() {
  return {
    restrict: 'E',
    templateUrl: 'js/products/templates/ratingStars.html',
    scope: {
        ratingValue: '=',
        //onRatingSelect: '&',
        read: '='
      },
    link: function(scope) {
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
        }
      };
      scope.$watch('ratingValue', function(oldValue, newValue) {
        if (newValue) {
          updateStars();
        }
      });
    }
  }
})

app.directive('reviewWriter', function() {
  return {
    restrict: 'E',
    controller: 'ProductCtrl',
    templateUrl: 'js/products/templates/reviewWriter.html'
  }
})
