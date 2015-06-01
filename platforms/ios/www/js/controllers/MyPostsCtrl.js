angular.module('starter.controllers')

.controller('MyPostsCtrl', function($scope, $http, $window, alert, Config) {
  $scope.refresh = function() {
    $scope.username = $window.localStorage['loggedInEmail'];

    if (!($scope.username)) {
      $scope.posts = {};
      return;
    }

    $http.get(Config.webServerUrl + 'myposts/' + $scope.username)
      .success(function(res) {
        $scope.posts = res;
      })

      .error(function(err) {
        alert('assertive', 'Error fetching posts', err.message);
      });
  };

  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    if (toState.url === '/myposts')
      $scope.refresh();
  });
});