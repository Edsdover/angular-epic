'use strict';

angular.module('f1-index')
.controller('HomeCtrl', function($rootScope, $scope, $state, User, Prediction, $window){

  var date = new Date();
  var year = date.getFullYear();
  $scope.showLast = false;
  $scope.isTime = false;
  lastRoundGet();

  $scope.showLastRace = function(){
    $scope.showLast = true;
  };
  User.show()
  .then(function(response){
    $scope.users = response.data.users;
  });

  var currentRound;
  var lastRound;
  var lastRoundResults = [];
  var retirements = [];
  var constructorPointsArray = [];
  var constructorPointsHash = {};
  function lastRoundGet(){
    $window.$.getJSON('http://ergast.com/api/f1/current/last/results.json')
    .then(function(response){
      var maxVal = 0;
      $scope.$apply(function() {
        $scope.lastRace = response.MRData.RaceTable.Races[0];
        lastRound = $scope.lastRace.round;
        $scope.lastPollWin = $window._.find($scope.lastRace.Results, $window._.matchesProperty('grid', '1'));
        var raceStatuses = $scope.lastRace.Results;
        raceStatuses.forEach(function(status){
          if(status.positionText === "R"){
            retirements.push(status);
          }
          if(status.points !== "0"){
            if(constructorPointsHash[status.Constructor.name]){
              constructorPointsHash[status.Constructor.name] += parseInt(status.points);
            }else{
              constructorPointsHash[status.Constructor.name] = parseInt(status.points);
            }
          }
        });
        for (var key in constructorPointsHash) {
          if (constructorPointsHash.hasOwnProperty(key)) {
            var value = constructorPointsHash[key];
            if(value > maxVal){
              maxVal = value;
              $scope.firstPlaceCons = key;
            }
          }
        }

        console.log(constructorPointsHash);
        console.log($scope.firstPlaceCons);

        $scope.raceRetirements = retirements.length;
        bestQualifyingTime();
      });
    });

    var currentRoundStandings = [];
    function currentStandings(){
      $window.$.getJSON('http://ergast.com/api/f1/current/constructorStandings.json')
      .then(function(response){
        $scope.$apply(function(){
          currentRoundStandings = response.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
          lastRoundStandings();
        });
      });
    }
    var lastConstructorStandings;
    function lastRoundStandings(){
      lastRound = lastRound - 1;
      $window.$.getJSON('http://ergast.com/api/f1/' + year + '/' + lastRound + '/constructorStandings.json')
      .then(function(response){
        $scope.$apply(function(){
          lastConstructorStandings = response.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
          bestQualifyingTime();
        });
      });
    }
    var bestTimes= [];
    function bestQualifyingTime(){
      console.log('lastRound', lastRound);
      currentRound = (lastRound * 1) + 1;
      $window.$.getJSON('http://ergast.com/api/f1/' + year + '/' + currentRound + '/qualifying.json')
      .then(function(response){
        $scope.bestLapDriver = response.MRData.RaceTable.Races[0].QualifyingResults[0].Driver.familyName;
        var firstRun = response.MRData.RaceTable.Races[0].QualifyingResults[0].Q1.split(':');
        var secondRun = response.MRData.RaceTable.Races[0].QualifyingResults[0].Q2.split(':');
        var thirdRun = response.MRData.RaceTable.Races[0].QualifyingResults[0].Q3.split(':');
        var lapRuns = [firstRun, secondRun, thirdRun];
        lapRuns.forEach(function(run){
          bestTimes.push((run[0] * 60) + (run[1] * 1));
        });
        $scope.bestQualifyingTime = $window._.min(bestTimes);
        bestPitStop();
      });
    }
    var pitStopTimes = [];
    function bestPitStop(){
      currentRound = (lastRound * 1) + 1;
      $window.$.getJSON('http://ergast.com/api/f1/' + year + '/' + currentRound + '/pitstops.json')
      .then(function(response){
        console.log('http://ergast.com/api/f1/' + year + '/' + currentRound + '/pitstops.json');
        console.log(response);
        var stops = response.MRData.RaceTable.Races[0].PitStops;
        stops.forEach(function(stop){
          pitStopTimes.push(stop.duration * 1);
        });
        $scope.bestPitTime = $window._.min(pitStopTimes);
        countdown();
      });
    }
    function countdown(){
      $window.$.getJSON('http://ergast.com/api/f1/current.json')
      .then(function(response){
        $scope.nextRace = response.MRData.RaceTable.Races[currentRound].raceName;
        var momentTime = $window.moment(response.MRData.RaceTable.Races[currentRound].date + ' ' + response.MRData.RaceTable.Races[currentRound].time);
        $scope.dateTime = momentTime;
        $scope.isTime = true;
        $scope.$apply();
      });
    }
  }
});
