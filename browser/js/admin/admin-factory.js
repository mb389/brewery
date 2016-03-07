app.factory('AdminFactory', function ($http, AuthService) {
  //manage users

  var AF = {};

  AF.checkAdminOwner = function() {
    AuthService.getLoggedInUser()
    .then(user => {
      if(!user) return null
      if (user.isAdmin || user.isOwner) {
        return true;
      } else {
        return null
      }
    })
    .then(null, null)
  }

  AF.getStore = function() {
    return AuthService.getLoggedInUser()
    .then(user => $http.get('api/stores/owner/'+user._id))
    .then(store => store.data)
    .then(null, console.err)
  }


  return AF;

})
