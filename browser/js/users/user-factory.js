app.factory('UserFactory', function ($http){

  return {
    getOrderForUser: function (userId){
      console.log('getOrderForUser');
      return $http.get('/api/users/' + userId + '/orders')
        .then(response => {
          return response.data;
        })
    }
  }
});
