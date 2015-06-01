angular.module('starter.controllers')

.controller('MyPostCtrl', function($scope, $http, $stateParams, $state, alert) {
  $http.get('http://129.25.12.35:8000/posts/' + $stateParams.postId)
    .success(function(post) {
      $scope.post = post;
    })

    .error(function(err) {
      alert('assertive', 'Error fetching post', err.message);
    });

  $scope.deletePost = function() {
    $http.delete('http://129.25.12.35:8000/posts/' + $scope.post._id)
      .success(function(post) {
        alert('balanced', 'Post successfully deleted.', 'Your post was successfully deleted.');
        $state.go('app.myposts');
      })
      .error(function(err) {
        alert('assertive', 'Post NOT deleted.', err.message);
      });
  };

  $scope.savePost = function() {
    $http.put('http://129.25.12.35:8000/posts/' + $scope.post._id, {
        title: $scope.post.title,
        description: $scope.post.description
      })
      .success(function(post) {
        alert('balanced', 'Post successfully updated.', 'Your post was successfully updated.');
        $scope.checked = false;
        $state.go('app.myposts');
      })
      .error(function(err) {
        alert('assertive', 'Post NOT updated.', err.message);
      });
  };
});