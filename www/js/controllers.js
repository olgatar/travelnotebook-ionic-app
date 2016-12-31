'use strict';

angular.module('travelnotebook.controllers', [])
// Controller for SignIn
    .controller('SignInCtrl', [
        'Auth','currentAuth','$scope', '$state','$rootScope', '$firebaseAuth', '$window',
        function(Auth, currentAuth, $scope, $state, $rootScope, $firebaseAuth, $window) {

          $scope.user = {
              email: "",
              password: ""
          };

          // signin and validate user credentials
          $scope.validateUser = function() {

              $rootScope.show('Please wait...');
              var email = this.user.email;
              var password = this.user.password;
              if (!email || !password) {
                  $rootScope.notify("Please enter valid email and/or password");
                  return false;
              }

              Auth.$signInWithEmailAndPassword(email, password)
              .then(function(user) {
                  $rootScope.hide();
                  $rootScope.userEmail = user.email;
                  $rootScope.userPassword = user.password;
                  //console.log("Logged in as:", user.uid);
                  $state.go('travelnotebook.travels');
              }).catch(function(error) {
                  $rootScope.hide();
                  //console.log(error.code);
                  if (error.code == 'auth/invalid-email') {
                      $rootScope.notify('Invalid Email Address');
                  } else if (error.code == 'auth/wrong-password') {
                      $rootScope.notify('Invalid Password');
                  } else if (error.code == 'auth/user-not-found') {
                      $rootScope.notify('Invalid User');
                  } else {
                      $rootScope.notify('Something went wrong. Please try again later');
                  }
              });
          }

        }
    ])

// Controller for SignUp
.controller('SignUpCtrl', [
  'Auth','currentAuth','$scope', '$state','$rootScope', '$firebaseAuth', '$window',
  function(Auth, currentAuth, $scope, $state, $rootScope, $firebaseAuth, $window) {

      $scope.user = {
          email: "",
          password: ""
      };
      $scope.createUser = function() {
        $rootScope.show('Please wait...');
          var email = this.user.email;
          var password = this.user.password;
          if (!email || !password) {
              $rootScope.notify("Please enter valid email and/or password");
              return false;
          }


          Auth.$createUserWithEmailAndPassword(email, password)
            .then(function(user) {
              //console.log("User " + user.uid + " created successfully!");
              $rootScope.userEmail = user.email;
              $rootScope.userPassword = user.password;
              $rootScope.hide();
              return Auth.$signInWithEmailAndPassword(email, password);
            }).then(function(user) {
              //console.log("Logged in as:", user.uid);
              $state.go('travelnotebook.travels');
            }).catch(function(error) {
              console.error("Error: ", error);
              $rootScope.hide();
              if (error.code == 'auth/invalid-email') {
                  $rootScope.notify('Invalid Email Address');
              } else if (error.code == 'auth/email-already-in-use') {
                  $rootScope.notify('Email Address is already taken');
              } else if (error.code == 'auth/weak-password') {
                  $rootScope.notify('Password should be at least 6 characters');
              } else {
                  $rootScope.notify('Something went wrong. Please try again later');
              }
            });

      }
    }
])

// Controller to publish all travel posts made by the current user
.controller('myTravelsCtrl', [
  'Auth','currentAuth','$scope', '$rootScope', '$state', '$window', '$ionicModal','$ionicLoading','$firebase','$timeout',
  function(Auth, currentAuth, $scope, $rootScope, $state, $window, $ionicModal, $ionicLoading, $firebase, $timeout) {
    //$rootScope.show("Please wait...");
    $scope.changeBtnVisible = true;
    var country = this.selected_country;
    var userId = firebase.auth().currentUser.uid;
    var userEmail = firebase.auth().currentUser.email;
    var EntriesRef = firebase.database().ref().child('users/' + userId);
    $scope.entries = [];
    $scope.entriesNoFilter = [];

    if (!country) {
      var country = null;
    }

    $scope.showAll = function() {
      $state.reload();
      //showAll();
    }

    showAll();

    function showAll() {
      $rootScope.show("Please wait...");
      // function to publish all entries
      EntriesRef.on('value', function(snapshot) {
        var data = snapshot.val();
        $timeout(function () {
          $scope.$apply(function() {
              $scope.entries = data;
              //console.log($scope.entries);
              $scope.entriesNoFilter = $scope.entries;
              if ($scope.entries == null) {
                  $scope.filterVisible = false;
                  $scope.noData = true;
                  $rootScope.hide();
              } else {
                  $scope.filterVisible = true;
                  $scope.noData = false;
                  $rootScope.hide();
              }
          });
        })
      });
    };

    // function for the filter initiation
    $scope.filterInit = function() {
      var country = this.selected_country;
      var EntriesRef = firebase.database().ref('users/' + userId).orderByChild("country").equalTo(country);
      EntriesRef.on('value', function(snapshot) {
        var data = snapshot.val();
        $timeout(function () {
          $scope.$applyAsync(function() {
              $scope.entries = data;
          });
        })
      });
    }

    $ionicModal.fromTemplateUrl('templates/newTravel.html', function(modal) {
        $scope.newTravelTemplate = modal;
    });

    $scope.newTravel = function() {
        $scope.newTravelTemplate.show();
    };

    $scope.deleteEntry = function(key) {
        $rootScope.show("Please wait...");
        var entryRef = firebase.database().ref().child('users/' + userId + '/' + key);
        entryRef.remove(function(error) {
            if (error) {
                $rootScope.hide();
                $rootScope.notify('Something went wrong. Try again later');
            } else {
                $rootScope.hide();
                $rootScope.notify('Deleted');
                showAll();
            }
        });

    };

    $scope.changeEntry = function(key) {
        $rootScope.show("Please wait...");
        var title = this.entry.title;
        var country = this.entry.country;
        var main_body = this.entry.main_body;
        var main_image = this.entry.main_image;
        var date = Date.now();

        var entryRef = firebase.database().ref().child('users/' + userId + '/' + key);
        entryRef.update({
          title: title,
          country: country,
          main_body: main_body,
          updated: date,
          main_image: main_image
        }, function(error) {
            if (error) {
                $rootScope.hide();
                $rootScope.notify('Something went wrong. Try again later');
            } else {
                $rootScope.hide();
                $rootScope.notify('Updated');
                showAll();
            }
        });
    };
}])

// Controller to publish all photos made by the current user
.controller('myPhotosCtrl', [
  'Auth','currentAuth','$scope', '$rootScope', '$state', '$window', '$ionicModal','$ionicLoading','$firebase','$timeout',
  function(Auth, currentAuth, $scope, $rootScope, $state, $window, $ionicModal, $ionicLoading, $firebase, $timeout) {
    $scope.changeBtnVisible = true;
    var country = this.selected_country;
    var userId = firebase.auth().currentUser.uid;
    var userEmail = firebase.auth().currentUser.email;
    var EntriesRef = firebase.database().ref().child('users/' + userId);
    $scope.entries = [];
    $scope.entriesNoFilter = [];

    if (!country) {
      var country = null;
    }

    $scope.showAll = function() {
      showAll();
    }

    showAll();

    function showAll() {
      $rootScope.show("Please wait...");
      // function to publish all entries
      EntriesRef.on('value', function(snapshot) {
        var data = snapshot.val();
        $timeout(function () {
          $scope.$apply(function() {
              $scope.entries = data;
              $scope.entriesNoFilter = $scope.entries;
              if ($scope.entries == null) {
                  $scope.filterVisible = false;
                  $scope.noData = true;
                  $rootScope.hide();
              } else {
                  $scope.filterVisible = true;
                  $scope.noData = false;
                  $rootScope.hide();
              }
          });
          checkEntries();
        })
      });
    };


    // function for the filter initiation
    $scope.filterInit = function() {
      var country = this.selected_country;
      var EntriesRef = firebase.database().ref('users/' + userId).orderByChild("country").equalTo(country);
      EntriesRef.on('value', function(snapshot) {
        var data = snapshot.val();
        $timeout(function () {
          $scope.$applyAsync(function() {
              $scope.entries = data;
          });
        })
      });
    }


    var checkEntries = function () {
      $scope.$applyAsync(function() {
        if ($scope.entries == 0) {
            $scope.noData = true;
        } else {
            $scope.noData = false;
        }
      });
    }

    $ionicModal.fromTemplateUrl('templates/newTravel.html', function(modal) {
        $scope.newTravelTemplate = modal;
    });

    $scope.newTravel = function() {
        $scope.newTravelTemplate.show();
    };
}])


// Controller to create a new post
.controller('newTravelCtrl', [
  'Auth','$scope', '$rootScope', '$state', '$window', '$ionicModal', '$firebase',
  function(Auth, $scope, $rootScope, $state, $window, $ionicModal, $firebase) {

/*
    document.addEventListener("deviceready", onDeviceReady, false);

      function onDeviceReady () {
         //alert('Loading Cordova is completed');
      }
*/
    $scope.uploadPhoto = function() {
       var options =   {
           quality: 50,
           destinationType: Camera.DestinationType.DATA_URL,
           sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
           encodingType: Camera.EncodingType.JPEG,
           targetWidth: 720
       }
       // Take picture using device camera and retrieve image as base64-encoded string
       navigator.camera.getPicture(onSuccess,onFail,options);
   }


    function onSuccess(imageData) {
        $scope.entry.main_image = "data:image/jpeg;base64," + imageData;
        var previewImage = document.getElementById('previewImage');
        previewImage.src = "data:image/jpeg;base64," + imageData;
        console.log($scope.entry.main_image);
        $scope.$apply();
    }

    function onFail(message) {
        alert('Failed because: ' + message);
    }

    $scope.entry = {
      userEmail: "",
      title: "",
      country: "",
      main_body: "",
      created: "",
      updated: "",
      main_image: ""
    };

    $scope.close = function() {
      $state.reload();
      $scope.modal.hide();
    };

    $scope.createNew = function() {
        var title = this.entry.title;
        var country = this.entry.country;
        var main_body = this.entry.main_body;
        var main_image = this.entry.main_image;
        var userId = firebase.auth().currentUser.uid;
        var userEmail = firebase.auth().currentUser.email;
        if (!title || !country || !main_body) {
          $rootScope.notify("Please fill in all input fields...");
          return;
        }
        $state.reload();
        $scope.modal.hide();

        $rootScope.show("Please wait...");

        var usersRef = firebase.database().ref('users');
        var entriesRef = firebase.database().ref('users/' + userId).child('entries');
        var newEntryKey = usersRef.child('entries').push().key;
        var date = Date.now();

        var entry = {
            key: newEntryKey,
            userEmail: userEmail,
            title: title,
            country: country,
            main_body: main_body,
            created: date,
            updated: date,
            main_image: main_image
        };

        writeNewPost(userId, entry, newEntryKey);

        // Create new post data to Firebase database for the current user
        function writeNewPost(userId, entry) {
          var updates = {};
          updates['users/' + userId + '/' + newEntryKey] = entry;
          return firebase.database().ref().update(updates);
        }
        $rootScope.hide();
    };
}])
