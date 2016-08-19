app.directive('navbar', function ($rootScope, AuthService, AUTH_EVENTS, $state, OrderFactory) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function (scope) {

            scope.items = [
                { label: 'Home', state: 'home' },
                { label: 'About', state: 'about' },
                { label: 'Documentation', state: 'docs' },
                { label: 'Members Only', state: 'membersOnly', auth: true }
            ];

            scope.user = null;

            scope.isLoggedIn = function () {
                return AuthService.isAuthenticated();
            };

            scope.logout = function () {
                AuthService.logout().then(function () {
                   $state.go('home');
                });
            };

            var adminCheck = function(){

              return AuthService.getLoggedInUser()
              .then(user => {

                if(!user){
                  scope.isAdmin = false;
                  scope.isOwner = false;
                } else{
                  scope.isAdmin = user.isAdmin;
                  scope.isOwner = user.isOwner;
                }
              })
            }

            var setUser = function () {
                AuthService.getLoggedInUser().then(function (user) {
                    scope.user = user;
                });
            };

            var removeUser = function () {
                scope.user = null;
            };

            setUser();
            adminCheck();

            var checkCartQuantity = function (){
               AuthService.getLoggedInUser()
               .then(function(user){
                 console.log(user)
                 return user ? OrderFactory.getOrderByUserIdOrSessionId(user._id) : OrderFactory.getOrderBySessionId()
               })
               .then(function(order){
                scope.number=0;
                order.products.forEach(prod =>{
                  scope.number += Number(prod.quantity)
                })
              })
            }

            $rootScope.$watch('totalQuantity', function(){

              if(!scope.number) checkCartQuantity();
              if($rootScope.totalQuantity === null) scope.number = null; //logout, cart will always be back to 0
              if($rootScope.totalQuantity === 0) checkCartQuantity();
              else
                scope.number += $rootScope.totalQuantity;
            })

            $rootScope.$watch('adminStatus', function(){
              if($rootScope.adminStatus === null){
                scope.isAdmin = false;
                scope.isOwner = false;
              }
              else adminCheck();
            })

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

        }

    };

});
