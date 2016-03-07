app.controller('AdminController', function($scope, ProductFactory, OrderFactory, AdminFactory, UserFactory, products, categories, orders, users) {
  $scope.products = products;
  $scope.categories = categories;
  $scope.orders = orders;
  $scope.users = users;
  $scope.productToUpdate = {};
  $scope.categoryToUpdate = {};


  $scope.populateProductForm = function(productObj) {
    $scope.productToUpdate = productObj;
  };

  $scope.populateCategory = function(categoryObj) {
    $scope.categoryToUpdate = categoryObj;
  };

  $scope.deleteUser = function(userId) {
    UserFactory.deleteUser(userId)
    .then(() => {
      $scope.users = $scope.users.filter(user => {
        if (user._id !== userId) return true;
      })
    })
  }

  $scope.checkUserStatus = function (user, type) {
    switch(type) {
      case 'admin':
        return user.isAdmin ? true : false;
      case 'owner':
        return user.isOwner ? true : false;
      case 'regular':
        return user.isOwner || user.isAdmin ? false : true;
      default:
        true;
    }
  }

  $scope.changeRole = function(user, type) {
    switch(type){
      case 'admin':
         user.isAdmin = true;
         break;
      case 'owner':
        user.isOwner = true;
        break;
      case 'regular':
        user.isAdmin = false;
        user.isOwner = false;
        break;
    }
    UserFactory.editExistingUser(user._id, user)
         .then(updatedUser => {
          $scope.users = $scope.users.map(usr => {
            if(usr._id === updatedUser) return updatedUser;
            return usr
          })
         })
  }


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
