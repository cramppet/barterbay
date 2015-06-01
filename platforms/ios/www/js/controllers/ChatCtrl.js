angular.module('starter.controllers')

.controller('ChatCtrl', function($scope, $stateParams, $window, $http, $state, $timeout, $ionicScrollDelegate, strophe, alert, Config) {
  $scope.toUser   = null;

  $scope.refresh = function() {
    $scope.chatId   = $stateParams.chatId;
    $scope.username = $window.localStorage['loggedInUser'];

    if (!($scope.username)) {
      $scope.messages = {};
      return;
    }

    $http.get(Config.webServerUrl + 'chat/' + $scope.chatId)
      .success(function(messages) {
        if (messages.length > 0) {
          $scope.messages = messages;

          $timeout(function() {
            $scope.$apply(function() {
              if (messages[0].sender === $scope.username)
                $scope.toUser = messages[0].reciever;
              else
                $scope.toUser = messages[0].sender;
              $ionicScrollDelegate.scrollBottom(true);
            });
          }, 500);
        }
      })
      .error(function(err) {
        alert('assertive', 'Error fetching messages', err.message);
      });
  };

  $scope.sendMessage = function() {
    if ($scope.message === '')
      return;

    strophe.sendMessage($scope.message, $scope.toUser, $scope.username, $scope.chatId);
    $scope.message = '';
  };

  $scope.$on('strophe-message-recieved', function() {
    $scope.refresh();
  });

  $scope.$on('strophe-message-sent', function() {
    $scope.refresh();
  });

  $scope.refresh();
});