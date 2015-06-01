angular.module('starter.controllers')

.controller('RegisterCtrl', function($scope, $auth, $window, $state, alert, strophe, Config) {
  $scope.user = {};
  $scope.emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  $scope.register = function() {
    if (!($scope.emailRegex.test($scope.user.email))) {
      alert('assertive', 'Invalid Email', 'Please enter a valid email address');
      return;
    }

    $auth.signup({ email: $scope.user.email, password: $scope.user.password })
      .then(function(res) {
        alert('balanced', 'Registration Successful', 'You are now registered');

        $window.localStorage['loggedInUser']  = res.data.user.email.split('@')[0] + '@' + Config.xmppDomain;
        $window.localStorage['loggedInEmail'] = res.data.user.email;

        strophe.createConnection($window.localStorage['loggedInUser'], 'password');

        $state.go('app.barterboard');
      })
      .catch(function(err) {
        alert('assertive', 'Registration Failed', err.message);
      });
    };
});
