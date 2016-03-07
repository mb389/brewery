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
      shopList: function() {
        return ["shop1","shop2","shop3"];
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
      theStore: function($stateParams) {
       return $stateParams.name;
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
