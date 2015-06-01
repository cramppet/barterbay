angular.module('starter.controllers')

.controller('BarterPostCtrl', function($scope, $stateParams, $http, $window, $state, alert) {
  $http.get('http://129.25.12.35:8000/posts/' + $stateParams.postId)
    .success(function(post) {
      $scope.post = post;
    })

    .error(function(err) {
      alert('assertive', 'Error fetching post', err.message);
    });

  $scope.startConversation = function() {
    var toUser    = $scope.post.poster.split('@')[0] + '@129.25.12.35';
    var fromUser  = $window.localStorage['loggedInUser'];
    var message   = 'BARTER_REQUEST_START';

    $http.post('http://129.25.12.35:8000/chats', {
      senderuser:     fromUser,
      recipientuser:  toUser,
      messagebody:    message
    })
    .success(function(res) {
      $state.go("app.chat", { "chatId": res.id });
    });
  };
});