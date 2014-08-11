'use strict';

/* Controllers */

angular.module('wearWhat.controllers', [])
.controller('Default', ['$scope', function($scope) {

}])
.controller('Weather', ['$scope', '$routeParams', '$http', function($scope,  $routeParams, $http) {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position){
			$scope.$apply(function(){
				console.log(position);
				$scope.apiKey =  $routeParams.apiKey;
				$scope.position = position;
				$scope.latitude = position.coords.latitude;
				$scope.longitude = position.coords.longitude;

				if ($routeParams.apiKey && position) {
					var query = "?units=si&exclude=minutely,alerts,daily,hourly,flags&callback=JSON_CALLBACK";
					var forecastIoUri = "https://api.forecast.io/forecast/"+ $routeParams.apiKey+"/" + position.coords.latitude + "," + position.coords.longitude;
					$http.jsonp(forecastIoUri+query)
					.success(function(status, response){console.log(status); $scope.weather = status;})
					.error(function(status, response){$scope.weather = response;});
				} else {
					$scope.weather = "Unknown";
				}
			});
		});
		
		
	}
}]);