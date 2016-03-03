app.directive('reviewBox', function(ReviewFactory) {
  return {
    restrict: 'E',
    templateUrl: 'js/reviews/templates/reviewBox.html',
    link: function($scope) {
      angular.extend($scope, ReviewFactory)
    }
  }
})
