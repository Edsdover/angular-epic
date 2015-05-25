'use strict';

angular.module('f1-index')
.controller('DashboardsCtrl', function($rootScope, $http, $scope){

  $scope.findYear = function(){
    var year = $scope.year;
    $http.get('http://ergast.com/api/f1/' + year + '/driverstandings.json')
    .then(function(response){
      $rootScope.driverInfo = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    });
  };
});
