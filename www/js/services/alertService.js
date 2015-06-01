angular.module('starter.services')

.service('alert', function alert($rootScope, $ionicModal) {
  return function(type, title, message) {
    if (($rootScope.alertType === undefined || $rootScope.alertType === '') &&
        ($rootScope.alertTitle === undefined || $rootScope.alertTitle === '') &&
        ($rootScope.alertMessage === undefined || $rootScope.alertMessage === '')) {
      $rootScope.alertType    = type;
      $rootScope.alertTitle   = title;
      $rootScope.alertMessage = message;

      $rootScope.alertClose = function() {
        $rootScope.alertType    = '';
        $rootScope.alertTitle   = '';
        $rootScope.alertMessage = '';
        $rootScope.alertModal.hide();
      };

      $ionicModal.fromTemplateUrl('templates/alert.html', {
        scope: $rootScope
      }).then(function(modal) {
          $rootScope.alertModal = modal;
          $rootScope.alertModal.show();
      });
    }
  };
});