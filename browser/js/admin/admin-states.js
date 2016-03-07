app.config(function ($stateProvider){
  $stateProvider
  .state('admin', {
    url:'/admin',
    templateUrl: '/js/admin/templates/admin.html',
    controller: 'AdminController',
    resolve: {
      user: function (AuthService) {
        return AuthService.getLoggedInUser()
      },
      isAllowed: function (AdminFactory) {
        return AdminFactory.checkAdminOwner()
      }
    }
  })
  .state('admin.products', {
    url: '/products',
    templateUrl:'/js/admin/templates/products.html',
    controller: 'AdminProdController',
    resolve: {
      products: function (ProductFactory) {
        return ProductFactory.getAllProducts();
      }
    }
  })
  .state('admin.categories', {
    url: '/categories',
    templateUrl:'/js/admin/templates/categories.html',
    controller: 'AdminCatController',
    resolve: {
      categories: function (ProductFactory) {
        return ProductFactory.getCategories();
      }
    }
  })
  .state('admin.orders', {
    url:'/orders',
    templateUrl:'/js/admin/templates/orders.html',
    controller: 'AdminOrderController',
    resolve: {
      orders: function (OrderFactory) {
        return OrderFactory.getAllOrders()
      },
    }
  })
  .state('admin.users', {
    url:'/users',
    templateUrl:'/js/admin/templates/users.html',
    controller: 'AdminUserController',
    resolve: {
      users: function(UserFactory) {
        return UserFactory.getAllUsers();
      }
    }
  })
})
