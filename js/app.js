(function(){


// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', [
  'ngRoute',
  'ngStorage',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controller',
  'myApp.controllerListenImages',
  'myApp.controllerListenSyllables',
  'myApp.controllerListenWords',
  'myApp.controllerReadLetters',
  'myApp.controllerReadWords',
  'myApp.controllerReadSyllables',
  'myApp.controllerWriteSyllables',
  'myApp.controllerWriteLetters',
  'myApp.controllerWriteWords',
  'myApp.controllerReadNumbers',
  'myApp.controllerWriteNumbers',
  'ngDragDrop',
  'ngTouch'
]);

myApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/home', {templateUrl: 'partials/home.html'});
	$routeProvider.when('/listenImages', {templateUrl: 'partials/listen-images.html', controller: 'CtrlListenImages'});
	$routeProvider.when('/listenSyllables', {templateUrl: 'partials/listen-syllables.html', controller: 'CtrlListenSyllables'});
	$routeProvider.when('/listenWords', {templateUrl: 'partials/listen-words.html', controller: 'CtrlListenWords'});
	$routeProvider.when('/readSyllables', {templateUrl: 'partials/read-syllables.html', controller: 'CtrlReadSyllables'});
	$routeProvider.when('/readLetters', {templateUrl: 'partials/read-letters.html', controller: 'CtrlReadLetters'});
	$routeProvider.when('/readWords', {templateUrl: 'partials/read-words.html', controller: 'CtrlReadWords'});
	$routeProvider.when('/readNumbers', {templateUrl: 'partials/read-numbers.html', controller: 'CtrlReadNumbers'});
	$routeProvider.when('/writeNumbers', {templateUrl: 'partials/write-numbers.html', controller: 'CtrlWriteNumbers'});
	$routeProvider.when('/writeSyllables', {templateUrl: 'partials/write-syllables.html', controller: 'CtrlWriteSyllables'});
	$routeProvider.when('/writeLetters', {templateUrl: 'partials/write-letters.html', controller: 'CtrlWriteLetters'});
	$routeProvider.when('/writeWords', {templateUrl: 'partials/write-words.html', controller: 'CtrlWriteWords'});
	$routeProvider.otherwise({redirectTo: '/home'});
}]);

})();
