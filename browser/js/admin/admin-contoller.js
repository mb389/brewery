app.controller('AdminController', function($scope, ProductFactory, OrderFactory, AdminFactory, products) {
  $scope.products = products;
  $scope.categories = categories
  $scope.productToUpdate = {};
  console.log($scope.productToUpdate)

  if($scope.productToUpdate.name) {
    console.log('should show ')
  }

  $scope.populateProductForm = function(productObj) {
    $scope.productToUpdate = productObj;
  };

  $scope.updateProduct = function() {
    console.log($scope.productToUpdate)
  }

});
