angular.module('starter.controllers')

.controller('ChatsCtrl', function($scope, $rootScope, $window, $http, alert, Config) {
  $scope.refresh = function() {
    $scope.username = $window.localStorage['loggedInUser'];

    if (!($scope.username)) {
      $scope.chats = {};
      return;
    }

    $http.get(Config.webServerUrl + 'mychats/' + $scope.username)
      .success(function(chats) {
        $scope.chats = chats;
      })
      .error(function(err) {
        alert('assertive', 'Error fetching chats', err.message);
      });
  };

  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    if (toState.url === '/chats')
      $scope.refresh();
  });

  $scope.$on('strophe-message-recieved', function() {
    console.log('we recieved a message via strophe');
    $scope.refresh();
  });
});