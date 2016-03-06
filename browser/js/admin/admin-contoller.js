app.controller('AdminController', function($scope, ProductFactory, OrderFactory, AdminFactory, products, categories, orders) {
  $scope.products = products;
  $scope.categories = categories
  $scope.orders = orders
  $scope.productToUpdate = {};
  $scope.categoryToUpdate = {};

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

  $scope.submitCategory = function(categoryObj) {
    if($scope.categoryToUpdate._id) {
      ProductFactory.updateCategory($scope.categoryToUpdate)
      .then(updatedCategory => {
        $scope.categories = $scope.categories.map(cat => {
          if(cat._id === updatedCategory._id) return updatedCategory;
          else return cat;
        })
        $scope.categoryToUpdate = {};
      });
    } else {
      $scope.categoryToUpdate.tags = $scope.categoryToUpdate.tags.split(",");
      ProductFactory.createCategory($scope.categoryToUpdate)
      .then(createdCat => {
        $scope.categories.push(createdCat)
        $scope.categoryToUpdate = {};
      })
    }
  }

  $scope.deleteCategory = function() {
    ProductFactory.deleteCategory($scope.categoryToUpdate)
    .then(() => {
      $scope.categories = $scope.categories.filter(cat => {
        if(cat._id !== $scope.categoryToUpdate._id) return cat;
      })
      $scope.categoryToUpdate = {};
    })

  }

});
