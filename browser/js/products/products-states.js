app.config(function ($stateProvider) {

  $stateProvider.state('oneProduct', {
    url: '/product',
      templateUrl: '/js/products/templates/product.html',
      controller: 'ProductCtrl',
      resolve: {
        theProduct: function (ProductFactory) {
          return ProductFactory.getOneProduct();
        }
      }
  });

  $stateProvider.state('allProducts', {
    url: '/products',
      templateUrl: '/js/products/templates/products.html',
      controller: 'ProductsCtrl',
      resolve: {
        allProducts: function (ProductFactory) {
          return ProductFactory.getAllProducts();
        }
      }
  });
});
