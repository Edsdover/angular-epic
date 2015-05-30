'use strict';

angular.module('f1-index')
.controller('PredictionsCtrl', function($rootScope, $scope, $window, Prediction){

  $scope.seasonPrediction = {};
  $scope.racePrediction = {};
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth();
  var day = date.getDay();
  var momentDate = $window.moment().format('YYYY-MM-DD');
  var momentTwoWeeks = $window.moment().subtract(14, 'days').calendar();
  momentTwoWeeks = momentTwoWeeks.split('/');
  momentTwoWeeks.push(momentTwoWeeks.splice(0,1));
  momentTwoWeeks.push(momentTwoWeeks.splice(0,1));
  $scope.drivers = null;
  $rootScope.currentSeason = year;
  var username = $scope.displayName;

  var userPredictions = [];
  Prediction.findAll(username)
  .then(function(response){
    var fullArray = response.data.predictions;
    fullArray.forEach(function(prediction){
      if(prediction.username === username){
        userPredictions.push(prediction);
        checkUser();
      }
    });
  });

  function checkUser(){
    userPredictions.forEach(function(prediction){
      if(prediction.constructorThirdPlace){
        $scope.seasonFormComplete = true;
      }else if(!prediction.constructorThirdPlace){
        $scope.raceFormComplete = true;
      }
    });
  }
  $scope.seasonFormComplete = false;
  $scope.raceFormComplete = false;

  $window.$.getJSON('http://ergast.com/api/f1/' + year + '/drivers.json', function(response){
    $scope.$apply(function() {
      $scope.drivers = response.MRData.DriverTable.Drivers;
    });
  });
  $window.$.getJSON('http://ergast.com/api/f1/' + year + '/constructorStandings.json', function(response){
    $scope.$apply(function() {
      $scope.constructors = response.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
    });
  });
  $window.$.getJSON('http://ergast.com/api/f1/current.json', function(response){
    $scope.$apply(function() {
      var upcommingRaces = [];
      var races = response.MRData.RaceTable.Races;
      races.forEach(function(race){
        if(momentDate < race.date){
          upcommingRaces.push(race);
          var nextRace = upcommingRaces[0].raceName;
          $rootScope.currentRace = nextRace;
        }
      });
    });
  });

  $scope.submitSeasonPrediction = function(obj){
    var prediction = new Prediction($scope.seasonPrediction);
    prediction.save(obj)
    .then(function(){
      $window.swal({title: 'Profile Updated', text: 'Congratulations, your profile was updated.', type: 'success'});
    })
    .catch(function(){
      $window.swal({title: 'Profile Save Error', text: 'Warning, there was a problem saving your profile.', type: 'error'});
    });
  };
  $scope.submitRacePrediction = function(obj){
    console.log(obj);
    var prediction = new Prediction(obj);
    prediction.save(obj)
    .then(function(){
      $window.swal({title: 'Profile Updated', text: 'Congratulations, your profile was updated.', type: 'success'});
    })
    .catch(function(){
      $window.swal({title: 'Profile Save Error', text: 'Warning, there was a problem saving your profile.', type: 'error'});
    });
  };

});
