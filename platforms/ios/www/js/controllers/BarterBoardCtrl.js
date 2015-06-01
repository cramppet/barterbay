angular.module('starter.controllers')

.controller('BarterBoardCtrl', function($scope, $http, $window, alert, Config) {
  $scope.refresh = function() {
    $scope.username = $window.localStorage['loggedInEmail'];

    if (!($scope.username)) {
      $scope.posts = {};
      return;
    }

    $http.get(Config.webServerUrl + 'posts')
      .success(function(posts) {
        $scope.posts = [];
        for (var i = 0; i < posts.length; i++) {
          if (posts[i].poster !== $scope.username)
            $scope.posts.push(posts[i]);
        }
      })

      .error(function(err) {
        if (err.message)
          alert('assertive', 'Post Update Error', err.message);
      });
  };

  $scope.refresh();
});