// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

angular.module('starter', 						['ionic', 'starter.controllers', 'starter.services', 'ngCordova', 'satellizer']);
angular.module('starter.controllers', ['ionic', 'starter.services']);
angular.module('starter.services', 		['ionic', 'ngCordova']);

angular.module('starter').run(function($ionicPlatform, $rootScope, alert) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    $rootScope.$on('strophe-message-recieved', function(event, user) {
      alert('balanced', 'Message Recieved', 'New message from ' + user.from);
    });
  });
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider, $authProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.myposts', {
    url: "/myposts",
    views: {
      'menuContent': {
        templateUrl: "templates/myposts.html",
        controller: 'MyPostsCtrl'
      }
    }
  })

  .state('app.mypost', {
    url: "/myposts/:postId",
    views: {
      'menuContent': {
        templateUrl: "templates/mypost.html",
        controller: 'MyPostCtrl'
      }
    }
  })

  .state('app.chats', {
    url: "/chats",
    views: {
      'menuContent': {
        templateUrl: "templates/chats.html",
        controller: 'ChatsCtrl'
      }
    }
  })

  .state('app.chat', {
    url: "/chats/:chatId",
    views: {
      'menuContent': {
        templateUrl: "templates/chat.html",
        controller: 'ChatCtrl'
      }
    }
  })

  .state('app.barterboard', {
    url: "/barterboard",
    views: {
      'menuContent': {
        templateUrl: "templates/barterboard.html",
        controller: 'BarterBoardCtrl'
      }
    }
  })

  .state('app.barterpost', {
    url: "/barterboard/:postId",
    views: {
      'menuContent': {
        templateUrl: "templates/barterpost.html",
        controller: 'BarterPostCtrl'
      }
    }
  })

  .state('app.register', {
    url: "/register",
    views: {
      'menuContent': {
        templateUrl: "templates/register.html",
        controller: 'RegisterCtrl'
      }
    }
  })

  .state('app.createpost', {
    url: "/createpost",
    views: {
      'menuContent': {
        templateUrl: "templates/createpost.html",
        controller: 'CreatePostCtrl'
      }
    }
  })
  
  .state('app.about', {
    url: '/about',
    views: {
      'menuContent': {
        templateUrl: "templates/about.html"
      }
    }
  })

  .state('app.terms', {
    url: '/terms',
    views: {
      'menuContent': {
        templateUrl: "templates/terms.html"
      }
    }
  });

  var commonConfig = {
    popupOptions: {
      location:           'no',
      toolbar:            'no',
      clearsessioncache:  'yes',
      clearcache:         'yes',
      width:              window.screen.width,
      height:             window.screen.height
    },
    redirectUri: 'http://localhost/',
  };

  $authProvider.baseUrl         = null;
  $authProvider.withCredentials = false;
  $authProvider.platform        = 'mobile';
  $authProvider.loginUrl        = 'http://129.25.12.35:8000/login';
  $authProvider.signupUrl       = 'http://129.25.12.35:8000/register';

  //
  //
  $authProvider.google(angular.extend({}, commonConfig, {
    clientId: '522866929029-th96nh9dqtic9v9b4remu88sccdtkpvj.apps.googleusercontent.com',
    url:      'http://129.25.12.35:8000/auth/google'
  }));

  //
  //
  $authProvider.facebook(angular.extend({}, commonConfig, {
    clientId: '945090258875901',
    url:      'http://129.25.12.35:8000/auth/facebook'
  }));

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/barterboard');
});
