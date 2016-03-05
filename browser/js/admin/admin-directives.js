app.directive('categoryButton', function(ReviewFactory) {
  return {
    restrict: 'E',
    template: `<button type="button" class="btn btn-default btn-lg">{{category}}</button>`,
    scope: {
      category: '=',
    }
  }
})
