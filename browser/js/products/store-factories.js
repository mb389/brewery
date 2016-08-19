app.factory('StoreFactory', function ($http){

  return {
    getStoreById: function (storeId){
     return $http.get('/api/stores/' + storeId)
           .then(response => response.data)
    },
    getStoreByName: function (storeName){
      return $http.get('/api/stores/name/' + storeName)
           .then(response => response.data)
    },
    getAllStores: function() {
      return $http.get('/api/stores/')
         .then(response => response.data)
    }
  }
})
