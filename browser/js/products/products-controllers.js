app.controller('ProductsCtrl', function ($scope, $log, allProducts) {

  $scope.products = allProducts;

    $scope.items = [
      'The first choice!',
      'And another choice for you.',
      'but wait! A third!'
    ];

    $scope.status = {
      isopen: false
    };

    $scope.toggled = function(open) {
      $log.log('Dropdown is now: ', open);
    };

    $scope.toggleDropdown = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.status.isopen = !$scope.status.isopen;
    };

    $scope.appendToEl = angular.element(document.querySelector('#dropdown-long-content'));


});


app.controller('ProductCtrl', function ($scope, $log, ProductFactory, theProduct, OrderFactory) {

  $scope.product = theProduct;
  $scope.addToOrder = function (productToAdd){
    productToAdd.quantity = Number($scope.quantity);
    OrderFactory.addOrCreate(productToAdd)
  }

});
