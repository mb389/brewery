app.config(function ($stateProvider){
  $stateProvider
  .state('fullcart', {
    url:'/fullcart/:id',
    templateUrl: '/js/orders/templates/cartview.html',
    controller: 'FullcartController',
    resolve: {
      pendingOrder: function ($stateParams, OrderFactory){
        return OrderFactory.getOrderByUserIdOrSessionId($stateParams.id)
      }
    }
  })
  .state('checkout', {
    url: '/checkout',
    templateUrl:'/js/orders/templates/checkout.html',
    controller: 'CheckoutController',
    resolve: {
      user: function (AuthService){
        return AuthService.getLoggedInUser().then(user => {
          return user;
        })
      }
    }
  })
  .state('checkout.completed', {
    url:'/completed',
    templateUrl:'/js/orders/templates/completed.html'
  })
})
