'use strict';

angular.module('f1-index')
.controller('ProfileCtrl', function($window, $scope, User){

  $scope.user = {};

  User.show()
  .then(function(response){
    $scope.user = response.data;
  });

  $scope.update = function(obj){
    var user = new User(obj);
    user.save()
    .then(function(){
      $window.swal({title: 'Profile Updated', text: 'Congratulations, your profile was updated.', type: 'success'});
    })
    .catch(function(){
      $window.swal({title: 'Profile Save Error', text: 'Warning, there was a problem saving your profile.', type: 'error'});
    });
  };

  $scope.camOn = function(){
    $scope.webcamOn = true;
    $window.Webcam.set({
      width: 320,
      height: 240,
      destWidth: 640,
      destHeight: 480,
      imageFormat: 'png',
      jpegQuality: 90,
    });
    $window.Webcam.attach('#camera');
  };

  $scope.takeSnapshot = function(){
    $window.Webcam.snap(function(dataUri){
      $scope.user.photo = dataUri;
    });
  };

  $scope.camOff = function(){
    $scope.webcamOn = false;
    $window.Webcam.reset();
  };

});
