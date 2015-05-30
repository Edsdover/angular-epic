'use strict';

angular.module('f1-index')
.controller('HomeCtrl', function($rootScope, $scope, $state, User, Prediction, $window){
  //
  // var username = $scope.displayName;
  var date = new Date();
  var year = date.getFullYear();
  $scope.showLast = false;
  lastRound();

  $scope.showLastRace = function(){
    $scope.showLast = true;
  };
  User.show()
  .then(function(response){
    $scope.users = response.data.users;
  });

  var lastRound = [];
  function lastRound(){
    $window.$.getJSON('http://ergast.com/api/f1/current/last/results.json')
    .then(function(response){
      $scope.$apply(function() {
        $scope.lastRace = response.MRData.RaceTable.Races[0];
        console.log('$scope.lastRace', $scope.lastRace);
        lastRound = $scope.lastRace.round;
        currentStandings();
      });
    });
  }
  var currentRoundStandings = [];
  function currentStandings(){
    $window.$.getJSON('http://ergast.com/api/f1/current/constructorStandings.json')
    .then(function(response){
      $scope.$apply(function(){
        currentRoundStandings = response.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
        console.log('currentRoundStandings', currentRoundStandings);
        lastRoundStandings();
      });
    });
  }
  var lastStandings = [];
  function lastRoundStandings(){
    lastRound = lastRound - 1;
    $window.$.getJSON('http://ergast.com/api/f1/' + year + '/' + lastRound + '/constructorStandings.json')
    .then(function(response){
      $scope.$apply(function(){
        lastRoundStandings = response.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
        console.log('lastRoundStandings', lastRoundStandings);
      });
    });
  }
  // var userPredictions = [];
  // Prediction.findAll(username)
  // .then(function(response){
  //   var fullArray = response.data.predictions;
  //   fullArray.forEach(function(prediction){
  //     if(prediction.username === username){
  //       userPredictions.push(prediction);
  //       setScope();
  //     }
  //   });
  // });
  //
  // $scope.racePredictions = [];
  // $scope.seasonPrediction = [];
  // function setScope(){
  //   userPredictions.forEach(function(prediction){
  //     if(prediction.constructorThirdPlace){
  //       $scope.seasonPrediction = prediction;
  //     }else if(prediction.pollPosition){
  //       $scope.racePredictions.push(prediction);
  //     }
  //     // $scope.racePredictions.flatten();
  //   });
  // }
  // $scope.editProfile = function(){
  //   $state.go('profile');
  // };
  // $scope.newPrediction = function(){
  //   $state.go('predictions.new');
  // };
});
