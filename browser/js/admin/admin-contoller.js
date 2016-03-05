app.controller('AdminController', function($scope, ProductFactory, OrderFactory, AdminFactory, products, categories) {
  $scope.products = products;
  $scope.categories = categories
  $scope.productToUpdate = {};
  // console.log($scope.productToUpdate)
  // console.log($scope.categories)
  // console.log($scope.productToUpdate.categories)

  // if($scope.productToUpdate.name) {
  //   console.log('should show ')
  // }

  console.log($scope.productToUpdate)

  $scope.populateProductForm = function(productObj) {
    $scope.productToUpdate = productObj;
  };

  $scope.updateProduct = function() {
    ProductFactory.editProductDetails($scope.productToUpdate._id, $scope.productToUpdate)
  }

  $scope.isBeerCategory = function(categoryId) {
    // console.log('categoryId: ', categoryId)
    // console.log('$scope.productToUpdate.categories: ', $scope.productToUpdate.categories)
    if ($scope.productToUpdate.name && $scope.productToUpdate.categories.indexOf(categoryId) !== -1) {
      return true;
    } else {
      return false;
    }
  };

  $scope.toggleCategory =function(categoryId) {
    if ($scope.productToUpdate.name && $scope.productToUpdate.categories.indexOf(categoryId) !== -1) {
      $scope.productToUpdate.categories.splice($scope.productToUpdate.categories.indexOf(categoryId), 1)
      console.log($scope.productToUpdate)
    } else {
      $scope.productToUpdate.categories.push(categoryId)
      console.log($scope.productToUpdate)
    }
  }


});
