'use strict';

angular.module('f1-index')
.controller('DashboardsCtrl', function($scope, $state, User, Prediction){

  var username = $scope.displayName;

  User.find($scope.activeUser.uid)
  .then(function(response){
    console.log(response);
    $scope.user = response.data.user;
  });
  var userPredictions = [];
  Prediction.findAll(username)
  .then(function(response){
    var fullArray = response.data.predictions;
    fullArray.forEach(function(prediction){
      if(prediction.username === username){
        userPredictions.push(prediction);
        setScope();
      }
    });
  });
  
  $scope.racePredictions = [];
  $scope.seasonPrediction = [];
  function setScope(){
    userPredictions.forEach(function(prediction){
      if(prediction.constructorThirdPlace){
        $scope.seasonPrediction = prediction;
      }else if(prediction.pollPosition){
        $scope.racePredictions.push(prediction);
      }
    });
  }
  $scope.editProfile = function(){
    $state.go('profile');
  };
  $scope.newPrediction = function(){
    $state.go('predictions.new');
  };
});
