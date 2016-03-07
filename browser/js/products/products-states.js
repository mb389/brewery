app.config(function ($stateProvider) {

  $stateProvider.state('allProducts', {
    url: '/products',
      templateUrl: '/js/products/templates/products.html',
      controller: 'ProductsCtrl',
      resolve: {
        allProducts: function (ProductFactory) {
          return ProductFactory.getAllProducts();
        },
        allCategories: function(ProductFactory) {
          return ProductFactory.getCategoryNames();
        }
      }
  });

  $stateProvider.state('shoplist', {
    url: '/stores/',
    templateUrl: '/js/products/templates/shoplist.html',
    controller: 'StoreListCtrl',
    resolve: {
      shopList: function(StoreFactory) {
        return StoreFactory.getAllStores();
      }
    }
  });

  $stateProvider.state('shopdisplay', {
    url: '/stores/:name',
    templateUrl: '/js/products/templates/shopdisplay.html',
    controller: 'StoreCtrl',
    resolve: {
      storeProducts: function($stateParams, ProductFactory) {
        return ProductFactory.getAllProducts();
      },
      storeCategories: function(ProductFactory) {
        return ProductFactory.getCategoryNames();
      },
      theStore: function($stateParams, StoreFactory) {
       return StoreFactory.getStoreByName($stateParams.name);
      }
    }
  });

  $stateProvider.state('prodParent', {
    url: '/product/:id',
    abstract: true,
    template: '<ui-view/>',
    controller: 'ProductCtrl',
    resolve: {
      theProduct: function (ProductFactory,$stateParams) {
        return ProductFactory.getOneProduct($stateParams.id);
      },
      productReviews: function($stateParams, ReviewFactory) {
        return ReviewFactory.getReviewsForProduct($stateParams.id)
      },
      loggedInUser: function(AuthService) {
        return AuthService.getLoggedInUser();
      }
    }
  });

  $stateProvider.state('prodParent.oneProduct', {
    url: '/display/',
    templateUrl: '/js/products/templates/product.html'
  });

  $stateProvider.state('prodParent.Review', {
    url: '/reviews/write',
    templateUrl: 'js/products/templates/reviewWriter.html'
  });

});
