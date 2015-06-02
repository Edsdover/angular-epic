'use strict';

angular.module('f1-index')
.controller('UsersCtrl', function($scope, $state, $window, User){
  $scope.name = $state.current.name;

  $scope.oauth = function(provider){
    User.oauth(provider)
    .then(function(){
      $state.go('home');
    });
  };

  $scope.submit = function(user){
    if($scope.name === 'register'){
      User.register(user)
      .then(function(){
        $state.go('login');
      })
      .catch(function(){
        $window.swal({title: 'Registration Error', text: 'There was a problem with your registration. Please try again.', type: 'error'});
      });
    }else{
      User.login(user)
      .then(function(){
        $state.go('home');
      })
      .catch(function(){
        $window.swal({title: 'Login Error', text: 'There was a problem with your login. Please try again.', type: 'error'});
      });
    }
  };
});
