(function(){   // anonymous wrapper : rien n'a besoin d'être global

	var app = angular.module('myApp.controllerListenAlphabet',[]);

	app.controller('CtrlListenAlphabet', function($scope, $http, $window) {


	$http.get('data/alphabet.json').success(function(data) {
		$scope.alphabet = data;
	});

	$scope.play = function(son) {
		document.getElementById(son).play();
	}


});

})();
