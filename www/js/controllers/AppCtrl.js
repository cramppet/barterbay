
angular.module('starter.controllers')

// AppCtrl - The main application controller for the BarterBay mobile application.
// 
// @purpose The purpose of this controller is to allow for users to log in using the log in dialog
//  on the left hand side menu as well as allow for users to log out. The controller also provides
//  a way to get to the registration page however registration is handled by the registration controller.
//  
// @param $scope The scope of the controller. This scope is a subset of the $rootScope object. This sub-scope
//  provides the ability for the controller to create local variables and functions which work well with the
//  accepted JavaScript development paradigm.
//  
// @param $ionicModal 
//  
// @param $state The state provider for the application. The state provider allows for the controller to nagivate
//  between different states and set them as it wishes. The states are defined in the router for the application.
//  
// @param auth
// @param alert
// @param authToken
//
.controller('AppCtrl', function($scope, $ionicModal, $state, $auth, $http, $rootScope, $window, $ionicHistory, $timeout, alert, strophe, Config) {

  // Form data for the login modal
  // 
  $scope.loginData = {};

  // We give the authToken service to the local scope so that we can determine if a user is logged in.
  // The logic for that code is found in the view of the side menu and is given as an Angular directive.
  // 
  $scope.isAuthenticated = $auth.isAuthenticated;

  // Create the login modal that we will use later, this login modal comes from a template.
  // 
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.loginModal = modal;
  });

  // Triggered in the login modal to close it
  // 
  $scope.closeLogin = function() {
    $scope.loginModal.hide();
    $scope.loginData.email    = '';
    $scope.loginData.password = '';
  };

  // Open the login modal
  // 
  $scope.login = function() {
    $scope.loginModal.show();
  };

  // When a user decides to log out, we simply want to remove their authentication token, this is an 
  // easy way to revoke their permissions to have access to protected data.
  //
  $scope.logout = function() {
    $window.localStorage.clear();
    strophe.destroyConnection();

    $ionicHistory.clearHistory();
    $ionicHistory.clearCache();

    $auth.logout();
  };

  // 
  //
  $scope.register = function() {
    $scope.closeLogin();
    $state.go('app.register');
  };

  // Perform the login action when the user submits the login form
  // 
  $scope.doLogin = function() {
    $auth.login({ email: $scope.loginData.email, password: $scope.loginData.password })
      .then(function(res) {
        $http.get(Config.webServerUrl + 'postlogin')
          .success(function(res) {
            alert('balanced', 'Authentication Successful', 'You have been logged in as ' + res.email);
            $window.localStorage['loggedInUser']  = res.email.split('@')[0] + '@' + Config.xmppDomain;
            $window.localStorage['loggedInEmail'] = res.email;

            strophe.createConnection($window.localStorage['loggedInUser'], 'password');
            $scope.closeLogin();
            $state.go('app.barterboard');
          })
          .error(function(err) {
            alert('assertive', 'Post Log In Failed', err.message);
          });
      })
      .catch(function(err) {
        alert('assertive', 'Authentication Failed', err.message);
        $scope.closeLogin();
      });
  };

  $scope.authenticate = function(provider) {
    $auth.authenticate(provider)
      .then(function(authres) {
        $http.get(Config.webServerUrl + 'postlogin')
          .success(function(postres) {
            alert('balanced', 'Authentication Successful', 'You have been logged in as ' + postres.email);
            $window.localStorage['loggedInUser']  = postres.email.split('@')[0] + '@' + Config.xmppDomain;
            $window.localStorage['loggedInEmail'] = postres.email;

            strophe.createConnection($window.localStorage['loggedInUser'], 'password');
            $scope.closeLogin();
            $state.go('app.barterboard');
          })
          .error(function(err) {
            alert('assertive', 'Post Log In Failed', err.message);
          });
      });
  };
});