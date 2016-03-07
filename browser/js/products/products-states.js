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

  $stateProvider.state('allProducts.guestShops', {
    url: '/stores/:name',
    templateUrl: '/js/products/templates/guestshops.html',
    resolve: {
      theStore: function($stateParams) {
        // return
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
