'use strict';

angular.module('f1-index')
.controller('DashboardsCtrl', function($scope, $state, User){

  User.show()
  .then(function(response){
    $scope.user = response.data;
  });

  $scope.editProfile = function(){
    $state.go('profile');
  };
  $scope.newPrediction = function(){
    console.log('click');
  }
});
