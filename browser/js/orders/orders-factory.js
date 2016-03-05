app.factory('OrderFactory', function ($http, AuthService){

  return {
    getAllOrders: function (){
      return $http.get('/api/orders/')
        .then( response => {
            return response.data;
        })
    },
    getOrderById: function (orderId){
      return $http.get('/api/orders/' + orderId)
        .then( response => {
          return response.data;
        })
    },
    getOrderByUserIdOrSessionId: function (userId) {
      return $http.get('/api/orders/user/session/' + userId)
        .then(response => {
            return response.data;
        })
    },
    getOrderBySessionId: function (){
      return $http.get('/api/orders/session/')
        .then( response => {
          return response.data;
        })
    },
    addOrCreate: function(productToAdd) {
      console.log('runs addOrCreate');
      AuthService.getLoggedInUser()
      .then(function (user){
        //check for order from user or session
        console.log('do we get user', user);
        if(!user) return $http.get('/api/orders/session/') //get order by session
        else return $http.get('/api/orders/user/session/' + user._id) //get order by user
      })
      .then(function (response){
        var order = response.data;
        console.log('do we get orders', order);
        //if theres and order update it with the product & quantity otherwise create
        if(order) {
          return $http.put('/api/orders/' + order._id, productToAdd)
          .then( response => {
            return response.data;
          })
        } else {
          return $http.post('/api/orders/', productToAdd)
          .then( response => {
            console.log(response.data);
            return response.data;
          })
        }
      })
    },
    updateOrAddProductToOrder: function (orderId, productToAdd){
      return $http.put('/api/orders/' + orderId, productToAdd)
        .then( response => {
          return response.data;
        })
    },
    createOrderAndAddProduct: function (productToAdd){
      return $http.post('/api/orders/', productToAdd)
        .then( response => {
          return response.data;
        })
    },
    editProductForOrder: function (orderId){
      return $http.put('/api/orders/purchase/' + orderId)
        .then( response => {
          return response.data;
        })
    },
    updatedStatusForOrder: function (orderId, status){
      return $http.put('/api/orders/' + orderId + '/' + status)
        .then( response => {
          return response.data;
        })
    },
    deleteOrder: function (orderId){
      return $http.delete('/api/orders/' + orderId)
        .then(response => {
          return response.data;
        })
    },
    deleteOrderForUser: function (orderId, userId){
      return $http.delete('/api/orders/' + orderId + '/' + userId)
        .then(response => {
          return response.data;
        })
    }

  }
})
