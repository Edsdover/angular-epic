'use strict';

angular.module('f1-index')
.factory('Prediction', function($rootScope, $http, nodeUrl){
  function Prediction(obj){
    this.constructorFirstPlace = obj.Constructor;
    this.driverFirstPlace = obj.driverFirstPlace;
    this.driverSecondPlace = obj.driverSecondPlace;
    this.driverThirdPlace = obj.driverThirdPlace;
    this.driverlapTime = obj.driverlapTime;
    this.pollPosition = obj.pollPosition;
    this.disqualifications = obj.disqualifications;
    this.lapTime = obj.lapTime;
    this.pitStop = obj.pitStop;
    this.raceName = obj.raceName;
    this.username = obj.username;
    console.log(obj);
  }
  Prediction.prototype.save = function(){
    return $http.put(nodeUrl + '/predictions', this);
  };

  return Prediction;
});
