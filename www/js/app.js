// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('travelnotebook', ['naif.base64','ionic','firebase','travelnotebook.controllers','travelnotebook.directives','travelnotebook.filters'])

.run(function($ionicPlatform, $rootScope, $state, $firebaseAuth, $firebase, $window, $ionicLoading, $ionicHistory) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    //Firebase authentication control
    $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
      // Catch an error thrown when the $requireSignIn promise is rejected
      // and redirect the user back to the home page
      if (error === "AUTH_REQUIRED") {
        event.preventDefault();
        $state.go("auth.signin");
      }
    });

    // Show ionic loading modal
    $rootScope.show = function(text) {
    $ionicLoading.show({
      template: '<p>'+ text + '</p><ion-spinner></ion-spinner>'
    });
  };

    // Hide ionic loading modal
    $rootScope.hide = function() {
      $ionicLoading.hide();
    };

    // Notify user with ionic modal show and hide on timeout
    $rootScope.notify = function(text) {
      $rootScope.show(text);
      $window.setTimeout(function() {
        $rootScope.hide();
      }, 2000);
    };

    // Logout session
    $rootScope.logout = function() {
    firebase.auth().signOut().then(function() {
        // Sign-out successful then clear cache
        $ionicHistory.clearCache();
        $window.location.reload();
        $state.go('auth.signin', null, { reload: true });
      }, function(error) {
        // An error happened.
      });
    };

  });
})

// Configure all routes and states to redirect to the right templateUrl
.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.tabs.position('bottom');
  $stateProvider
  // Authentication template with options: signup or signin
    .state('auth', {
      cache: false,
      url: "/auth",
      abstract: true,
      templateUrl: "templates/auth.html",
      resolve: {
        // Controller will not be loaded until $waitForSignIn resolves
        // Auth refers to $firebaseAuth wrapper in the factory below
        "currentAuth": ["Auth", function(Auth) {
          // $waitForSignIn returns a promise so the resolve waits for it to complete
          return Auth.$waitForSignIn();
        }]
      }
    })
    // Authentication option: signin + template
    .state('auth.signin', {
      cache: false,
      url: '/signin',
      views: {
        'auth-signin': {
          templateUrl: 'templates/auth-signin.html',
          controller: 'SignInCtrl'
        }
      },
      resolve: {
        // Controller will not be loaded until $waitForSignIn resolves
        // Auth refers to $firebaseAuth wrapper in the factory below
        "currentAuth": ["Auth", function(Auth) {
          // $waitForSignIn returns a promise so the resolve waits for it to complete
          return Auth.$waitForSignIn();
        }]
      }
    })
    // Authentication option: signup + template
    .state('auth.signup', {
      cache: false,
      url: '/signup',
      views: {
        'auth-signup': {
          templateUrl: 'templates/auth-signup.html',
          controller: 'SignUpCtrl'
        }
      },
      resolve: {
        // Controller will not be loaded until $waitForSignIn resolves
        // Auth refers to $firebaseAuth wrapper in the factory below
        "currentAuth": ["Auth", function(Auth) {
          // $waitForSignIn returns a promise so the resolve waits for it to complete
          return Auth.$waitForSignIn();
        }]
      }
    })
    .state('travelnotebook', {
        cache: false,
        url: "/travelnotebook",
        abstract: true,
        templateUrl: "templates/travelnotebook.html"
    })
    // Template for travels list
    .state('travelnotebook.travels', {
      cache: false,
      url: '/travels',
      views: {
        'travelnotebook-travels': {
          templateUrl: 'templates/travelnotebook-travels.html',
          controller: 'myTravelsCtrl'
        }
      },
      resolve: {
        // Controller will not be loaded until $requireSignIn resolves
        // Auth refers to $firebaseAuth wrapper in the factory below
        "currentAuth": ["Auth", function(Auth) {
          // $requireSignIn returns a promise so the resolve waits for it to complete
          // If the promise is rejected, it will throw a $stateChangeError (see above)
          return Auth.$requireSignIn();
        }]
      }
    })
    // Template for travels list
    .state('travelnotebook.photos', {
      cache: false,
      url: '/photos',
      views: {
        'travelnotebook-photos': {
          templateUrl: 'templates/travelnotebook-photos.html',
          controller: 'myPhotosCtrl'
        }
      },
      resolve: {
        // Controller will not be loaded until $requireSignIn resolves
        // Auth refers to $firebaseAuth wrapper in the factory below
        "currentAuth": ["Auth", function(Auth) {
          // $requireSignIn returns a promise so the resolve waits for it to complete
          // If the promise is rejected, it will throw a $stateChangeError (see above)
          return Auth.$requireSignIn();
        }]
      }
    })
    $urlRouterProvider.otherwise('/auth/signin');
})

// Authentication object factory
.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    return $firebaseAuth();
  }
]);
