'use strict';

angular.module('f1-index')
.factory('Prediction', function($rootScope, $http, nodeUrl){
  function Prediction(obj){
    this.constructorFirstPlace = obj.constructorFirstPlace;
    this.driverFirstPlace = obj.driverFirstPlace;
    this.driverSecondPlace = obj.driverSecondPlace;
    this.driverThirdPlace = obj.driverThirdPlace;
    this.driverLapTime = obj.driverLapTime;
    this.pollPosition = obj.pollPosition;
    this.disqualifications = obj.disqualifications;
    this.lapTime = obj.lapTime;
    this.pitStop = obj.pitStop;
    this.raceName = $rootScope.currentRace;
    this.username = $rootScope.displayName;
    console.log(obj);
  }
  Prediction.prototype.save = function(){
    return $http.put(nodeUrl + '/predictions', this);
    console.log('this', this);
  };

  return Prediction;
});