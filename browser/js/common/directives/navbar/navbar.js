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
              // if($rootScope.adminStatus) scope.isAdmin = $rootScope.adminStatus;
              return AuthService.getLoggedInUser()
              .then(user => {
                console.log('admin check', user)
                if(!user) scope.isAdmin = false;
                else scope.isAdmin = user.isAdmin;
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
                    if(!user) return OrderFactory.getOrderBySessionId()
                   return OrderFactory.getOrderByUserIdOrSessionId(user._id)
               })
               .then(function(order){
                var sum = 0;
                order.products.forEach(prod =>{
                  sum += Number(prod.quantity)
                })
                scope.number = sum;
              })
            }

            $rootScope.$watch('totalQuantity', function(){
              console.log('here we are rootscope', $rootScope.totalQuantity);
              if(!scope.number) checkCartQuantity();
              if($rootScope.totalQuantity === null) scope.number = null; //logout, cart will always be back to 0
              if($rootScope.totalQuantity === 0) checkCartQuantity();
              else scope.number += $rootScope.totalQuantity;
            })

            $rootScope.$watch('adminStatus', function(){
              if($rootScope.adminStatus === null) scope.isAdmin = false;
              else adminCheck();
            })

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

        }

    };

});
