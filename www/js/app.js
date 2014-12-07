'use strict';


// Declare app level module which depends on filters, and services
angular.module('wearWhat', [
	'ionic',
	'ngRoute',
	'wearWhat.filters',
	'wearWhat.services',
	'wearWhat.directives',
	'wearWhat.controllers'
	])
// .config(['$routeProvider', '$httpProvider', function($routeProvider,$httpProvider) {
// 	$routeProvider.when('/about', {templateUrl: 'partials/about.html', controller: 'Default'});
// 	$routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'Login'});
// 	$routeProvider.when('/weartorun', {templateUrl: 'partials/weather.html', controller: 'WearToRun'});
// 	$routeProvider.when('/m', {templateUrl: 'partials/app.html', controller: 'WearToRun'});
// 	$routeProvider.otherwise({redirectTo: '/m'});
// }])
.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

	// Ionic uses AngularUI Router which uses the concept of states
	// Learn more here: https://github.com/angular-ui/ui-router
	// Set up the various states which the app can be in.
	// Each state's controller can be found in controllers.js
	$stateProvider

	.state('home', {
		url: '/',
		templateUrl: 'home.html',
		controller: 'WearToRun'
	})

	.state('login', {
		url: '/login',
		controller: 'Login',
		templateUrl: 'login.html'
	})

	.state('about', {
		url: '/about',
		controller: 'Default',
		templateUrl: 'about.html'
	});

	$urlRouterProvider.otherwise('/');
})
;
