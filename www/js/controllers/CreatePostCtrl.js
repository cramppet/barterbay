angular.module('starter.controllers')

.controller('CreatePostCtrl', function($scope, $http, $window, $state, $rootScope, alert) {
  $scope.post = {};

  $scope.createPost = function() {
    $http.post('http://129.25.12.35:8000/posts', {
      title: $scope.post.title,
      description: $scope.post.description,
      poster: $window.localStorage['loggedInEmail']
    })
    .success(function(res) {
      alert('balanced', 'Post Created', 'Post was created successfully!');
      $scope.post.title = '';
      $scope.post.description = '';
      $state.go('app.myposts');
    })
    .error(function(err) {
      alert('assertive', 'Post NOT Created', 'The post could not be created at this time');
    });
  };
});