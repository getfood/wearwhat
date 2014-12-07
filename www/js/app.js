'use strict';


// Declare app level module which depends on filters, and services
angular.module('wearWhat', [
	'ionic',
	'ngRoute',
	'wearWhat.filters',
	'wearWhat.services',
	'wearWhat.directives',
	'wearWhat.controllers'
	]).
config(['$routeProvider', '$httpProvider', function($routeProvider,$httpProvider) {
	$routeProvider.when('/about', {templateUrl: 'partials/about.html', controller: 'Default'});
	$routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'Login'});
	$routeProvider.when('/weartorun', {templateUrl: 'partials/weather.html', controller: 'WearToRun'});
	$routeProvider.when('/m', {templateUrl: 'partials/app.html', controller: 'WearToRun'});
	$routeProvider.otherwise({redirectTo: '/m'});
}]);
