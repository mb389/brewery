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

  $stateProvider.state('oneProduct', {
    url: '/product/:id',
      templateUrl: '/js/products/templates/product.html',
      controller: 'ProductCtrl',
      resolve: {
        theProduct: function (ProductFactory,$stateParams) {
          return ProductFactory.getOneProduct($stateParams.id);
        }
      }
  });
});
