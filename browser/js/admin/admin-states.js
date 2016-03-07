app.config(function ($stateProvider){
  $stateProvider
  .state('admin', {
    url:'/admin',
    templateUrl: '/js/admin/templates/admin.html',
    resolve: {
      products: function (ProductFactory) {
        return ProductFactory.getAllProducts();
      },
      categories: function (ProductFactory) {
        return ProductFactory.getCategories();
      },
      orders: function (OrderFactory) {
        return OrderFactory.getAllOrders()
      },
      users: function(UserFactory) {
        return UserFactory.getAllUsers();
      }

    }
  })
  .state('admin.products', {
    url: '/products',
    templateUrl:'/js/admin/templates/products.html',
    controller: 'AdminController'
  })
  .state('admin.categories', {
    url: '/categories',
    templateUrl:'/js/admin/templates/categories.html',
    controller: 'AdminController'
  })
  .state('admin.orders', {
    url:'/orders',
    templateUrl:'/js/admin/templates/orders.html',
    controller: 'AdminController',
    resolve: {

    }
  })
  .state('admin.users', {
    url:'/users',
    templateUrl:'/js/admin/templates/users.html',
    controller: 'AdminController',
    resolve: {

    }
  })
})
