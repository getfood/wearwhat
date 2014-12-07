'use strict';

/* Controllers */

angular.module('wearWhat.controllers', [])
.controller('Default', ['$scope', function($scope) {

}])
.controller('WearToRun', ['$scope', '$routeParams', '$http', function($scope,  $routeParams, $http) {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position){
			$scope.$apply(function(){
				//console.log(position);
				$scope.apiKey = 'API token not show and not in request params since it stored in serverside'
				$scope.position = position;
				$scope.latitude = position.coords.latitude;
				$scope.longitude = position.coords.longitude;

				if (position) {
					var query = "?units=si&exclude=minutely,alerts,daily,hourly,flags";
					var forecastIoUri = "/weather/" + position.coords.latitude + "," + position.coords.longitude;
					$http.get(forecastIoUri+query)
					.success(function(status, response){console.log(status); $scope.weather = status;})
					.error(function(status, response){$scope.weather = response;});
				} else {
					$scope.weather = "Unknown";
				}
			});
		});
	}
}])
.controller('Login',['$scope','$routeParams', '$http', function($scope,  $routeParams, $http){
	console.log("Tried Login")
}])
;
