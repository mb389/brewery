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
    AuthService.getLoggedInUser()
    .then(user => {
      return $http.get('api/store/owner/user._id')
    })
    .then(null, console.err)
  }


  return AF;

})
