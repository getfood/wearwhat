'use strict';


// Declare app level module which depends on filters, and services
angular.module('wearWhat', [
	'ngRoute',
	'wearWhat.filters',
	'wearWhat.services',
	'wearWhat.directives',
	'wearWhat.controllers'
	]).
config(['$routeProvider', '$httpProvider', function($routeProvider,$httpProvider) {
	$routeProvider.when('/default', {templateUrl: 'partials/default.html', controller: 'Default'});
	$routeProvider.when('/weartorun', {templateUrl: 'partials/weather.html', controller: 'WearToRun'});
	$routeProvider.otherwise({redirectTo: '/default'});
}]);
