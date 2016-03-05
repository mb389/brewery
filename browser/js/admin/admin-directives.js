app.directive('categoryButton', function(ReviewFactory) {
  return {
    restrict: 'E',
    template: `<button type="button" class="btn btn-default btn-lg"{{>cat}}</button>`,
    scope: {
      cat: '=',
    }
  }
})
