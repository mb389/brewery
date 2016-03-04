app.config(function ($stateProvider){
  $stateProvider
  .state('fullcart', {
    url:'/fullcart',
    templateUrl: '/js/orders/templates/cartview.html',
    controller: 'FullcartController',
    resolve: {
      pendingOrder: function (OrderFactory, AuthService){
        AuthService.getLoggedInUser(true)
        .then(user => {
          console.log('heres users', user);
          if(user) return OrderFactory.getOrderByUserIdOrSessionId(user.id);
          else return OrderFactory.getOrderBySessionId()
        })
      }
    }
  })
  .state('fullcart.checkout', {
    url: '/checkout',
    templateUrl:'/js/orders/templates/checkout.html',
    controller: 'CheckoutController',
    resolve: {
      user: function (AuthService){
        return AuthService.getLoggedInUser().then(user => {
          return user;
        })
      },

    }
  })
  .state('fullcart.checkout.completed', {
    url:'/completed',
    templateUrl:'/js/orders/templates/completed.html'
  })
})
