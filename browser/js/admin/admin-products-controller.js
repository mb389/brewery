app.controller('AdminProdController', function($scope, ProductFactory, OrderFactory, AdminFactory, UserFactory, products, store) {

  if($scope.user.isAdmin) {
     $scope.products = products;
  } else {
    $scope.products = products.filter(prod => {
      if(store && prod.store === store._id) return prod;
    })
  }

  $scope.productToUpdate = {};


  $scope.populateProductForm = function(productObj) {
    $scope.productToUpdate = productObj;
  };

  $scope.populateCategory = function(categoryObj) {
    $scope.categoryToUpdate = categoryObj;
  };




  $scope.isBeerCategory = function(categoryId) {
    if ($scope.productToUpdate.categories && $scope.productToUpdate.categories.indexOf(categoryId) !== -1) {
      return true;
    } else {
      return false;
    }
  };

  $scope.toggleCategory =function(categoryId) {
    if($scope.productToUpdate._id) {
      if ($scope.productToUpdate.categories.indexOf(categoryId) !== -1) {
        $scope.productToUpdate.categories = $scope.productToUpdate.categories.filter(cat => {
          if(cat !== categoryId) return cat;
        })
      } else {
        $scope.productToUpdate.categories.push(categoryId);
      }
    } else {
      //new product
      if (!$scope.productToUpdate.categories) {
        $scope.productToUpdate.categories = []
      }
      if ($scope.productToUpdate.categories.indexOf(categoryId) !== -1) {
        $scope.productToUpdate.categories = $scope.productToUpdate.categories.filter(cat => {
          if(cat !== categoryId) return cat;
        })
      } else {
        $scope.productToUpdate.categories.push(categoryId);
      }
    }
  }


  $scope.updateProduct = function() {
     if($scope.productToUpdate._id) {
      ProductFactory.editProductDetails($scope.productToUpdate._id, $scope.productToUpdate)
      .then(updatedProduct => {
        $scope.products = $scope.products.map(prod => {
          if (prod._id === updatedProduct._id) return updatedProduct;
          else return prod
        })
        $scope.productToUpdate = {};
      })
      } else {
        if(store) $scope.productToUpdate.store = store._id;
        console.log($scope.productToUpdate);
        ProductFactory.addProduct($scope.productToUpdate)
        .then(createdProd => {
          $scope.products = $scope.products.concat(createdProd)
          $scope.productToUpdate = {};
      })
    }
  }

  $scope.deleteProduct = function () {
    ProductFactory.removeProduct($scope.productToUpdate._id)
    .then(() => {
      $scope.products = $scope.products.filter(prod => {
        if (prod._id !== $scope.productToUpdate._id) return prod;
      })
      $scope.productToUpdate = {};
    })
  }

});
