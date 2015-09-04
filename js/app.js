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
  'myApp.controllerListenImagesEn',
  'myApp.controllerListenSyllables',
  'myApp.controllerListenWords',
  'myApp.controllerListenAlphabet',
  'myApp.controllerReadLetters',
  'myApp.controllerReadWords',
  'myApp.controllerReadSyllables',
  'myApp.controllerWriteSyllables',
  'myApp.controllerWriteLetters',
  'myApp.controllerWriteWords',
  'myApp.controllerListenNumbers',
  'myApp.controllerReadNumbers',
  'myApp.controllerWriteNumbers',
  'myApp.controllerListenLineNumbers',
  'myApp.controllerListenTableNumbers',
  'myApp.controllerListenFamilyNumbers',
  'myApp.controllerCalculAdditions',
  'myApp.controllerTablesAddition',
  'myApp.controllerTablesMultiplication',
  'ngDragDrop',
  'ngTouch'
]);

myApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/home', {templateUrl: 'partials/home.html'});
	$routeProvider.when('/listenImages', {templateUrl: 'partials/listen-images.html', controller: 'CtrlListenImages'});
	$routeProvider.when('/listenImagesEn', {templateUrl: 'partials/listen-images-en.html', controller: 'CtrlListenImagesEn'});
	$routeProvider.when('/listenSyllables', {templateUrl: 'partials/listen-syllables.html', controller: 'CtrlListenSyllables'});
	$routeProvider.when('/listenWords', {templateUrl: 'partials/listen-words.html', controller: 'CtrlListenWords'});
	$routeProvider.when('/listenAlphabet', {templateUrl: 'partials/listen-alphabet.html', controller: 'CtrlListenAlphabet'});
	$routeProvider.when('/readSyllables', {templateUrl: 'partials/read-syllables.html', controller: 'CtrlReadSyllables'});
	$routeProvider.when('/readLetters', {templateUrl: 'partials/read-letters.html', controller: 'CtrlReadLetters'});
	$routeProvider.when('/readWords', {templateUrl: 'partials/read-words.html', controller: 'CtrlReadWords'});
	$routeProvider.when('/listenNumbers', {templateUrl: 'partials/listen-numbers.html', controller: 'CtrlListenNumbers'});
	$routeProvider.when('/readNumbers', {templateUrl: 'partials/read-numbers.html', controller: 'CtrlReadNumbers'});
	$routeProvider.when('/writeNumbers', {templateUrl: 'partials/write-numbers.html', controller: 'CtrlWriteNumbers'});
	$routeProvider.when('/listenLineNumbers', {templateUrl: 'partials/listen-line-numbers.html', controller: 'CtrlListenLineNumbers'});
	$routeProvider.when('/listenTableNumbers', {templateUrl: 'partials/listen-table-numbers.html', controller: 'CtrlListenTableNumbers'});
	$routeProvider.when('/listenFamilyNumbers', {templateUrl: 'partials/listen-family-numbers.html', controller: 'CtrlListenFamilyNumbers'});
	$routeProvider.when('/writeSyllables', {templateUrl: 'partials/write-syllables.html', controller: 'CtrlWriteSyllables'});
	$routeProvider.when('/writeLetters', {templateUrl: 'partials/write-letters.html', controller: 'CtrlWriteLetters'});
	$routeProvider.when('/writeWords', {templateUrl: 'partials/write-words.html', controller: 'CtrlWriteWords'});
	$routeProvider.when('/calculAdditions', {templateUrl: 'partials/calcul-additions.html', controller: 'CtrlCalculAdditions'});
	$routeProvider.when('/tablesAddition', {templateUrl: 'partials/tables-addition.html', controller: 'CtrlTablesAddition'});
	$routeProvider.when('/tablesMultiplication', {templateUrl: 'partials/tables-multiplication.html', controller: 'CtrlTablesMultiplication'});
	$routeProvider.otherwise({redirectTo: '/home'});
}]);

})();
