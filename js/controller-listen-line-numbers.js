(function(){   // anonymous wrapper : rien n'a besoin d'être global

	var app = angular.module('myApp.controllerListenLineNumbers',[]);

	app.controller('CtrlListenLineNumbers', function($scope, $http, $window) {


	$http.get('data/nombres-en-ligne.json').success(function(data) {
		$scope.nombres = data;
	});

	$scope.play = function(son) {
		document.getElementById(son).play();
	}


});

})();
