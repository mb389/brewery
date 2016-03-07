app.config(function ($stateProvider){
  $stateProvider
  .state('fullcart', {
    url:'/fullcart',
    templateUrl: '/js/orders/templates/fullcart.html',
    resolve: {
      pendingOrder: function (OrderFactory, AuthService){
        return AuthService.getLoggedInUser(true)
          .then(user => {
            console.log('heres users', user);
            if(user) return OrderFactory.getOrderByUserIdOrSessionId(user._id);
            else return OrderFactory.getOrderBySessionId()
          })
      }
    }
  })
  .state('fullcart.order', {
    url: '/order',
    templateUrl: '/js/orders/templates/cartview.html',
    controller: 'FullcartController',
  })
  .state('fullcart.checkout', {
    url: '/checkout',
    templateUrl:'/js/orders/templates/checkout.html',
    controller: 'CheckoutController',
  })
  .state('fullcart.completed', {
    url:'/completed',
    templateUrl:'/js/orders/templates/completed.html',
  })
  .state('orderhistory', {
    url: '/orderhistory',
    templateUrl: '/js/orders/templates/orderhistory.html',
    controller: 'OrderHistoryController',
    resolve: {
      user: function(AuthService) {
        return AuthService.getLoggedInUser()
      },
      pastOrders: function(AuthService, OrderFactory){
        return AuthService.getLoggedInUser()
          .then(user => {
            return OrderFactory.getPastOrdersForLoggedInUser(user._id)
          })
          .then(orders => {
            console.log('we got orders in state', orders);
            return orders;
          })
      }
    }
  })
})
