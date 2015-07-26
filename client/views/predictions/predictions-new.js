'use strict';

angular.module('f1-index')
.controller('PredictionsCtrl', function($rootScope, $scope, $window, Prediction, $state){

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
  var debug = true;

  $scope.seasonFormComplete = false;
  $scope.raceFormComplete = false;

  var userPredictions = [];
  Prediction.findAll(username)
  .then(function(response){
    var fullArray = response.data.predictions;
    fullArray.forEach(function(prediction){
      if(prediction.username === username){
        userPredictions.push(prediction);
        checkUser();
        console.log(prediction);
      }
    });
  });

  function checkUser(){
    userPredictions.forEach(function(prediction){
      if(prediction.constructorThirdPlace){
        $scope.seasonFormComplete = true;
      }else if(!prediction.constructorThirdPlace && prediction.raceName == $rootScope.currentRace){
        $scope.raceFormComplete = true;
      }
    });
  }

  var ergastDriversURI = 'http://ergast.com/api/f1/' + year + '/drivers.json';

  if (debug === true) {
    console.log(ergastDriversURI);
    console.log(Prediction);
    // test
  }

  $window.$.getJSON(ergastDriversURI, function(response){
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
          console.log($rootScope.currentRace);
        }
      });
    });
  });

  $scope.submitSeasonPrediction = function(obj){
    var prediction = new Prediction($scope.seasonPrediction);
    prediction.save(obj)
    .then(function(){
      $window.swal({title: 'Prediction Success', text: 'Congratulations, your submition was saved.', type: 'success'});
      $state.go('dashboards');
    })
    .catch(function(){
      $window.swal({title: 'Prediction Save Error', text: 'Warning, there was a problem saving your prediction.', type: 'error'});
    });
  };
  $scope.submitRacePrediction = function(obj){
    var prediction = new Prediction(obj);
    prediction.save(obj)
    .then(function(){
      $state.go('dashboards');
      $window.swal({title: 'Prediction Updated', text: 'Congratulations, your submition was saved.', type: 'success'});
    })
    .catch(function(){
      $window.swal({title: 'Prediction Save Error', text: 'Warning, there was a problem saving your submission.', type: 'error'});
    });
  };

});
