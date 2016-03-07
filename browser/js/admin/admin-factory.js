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


  return AF;

})
