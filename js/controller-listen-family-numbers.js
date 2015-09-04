(function(){   // anonymous wrapper : rien n'a besoin d'être global

	var app = angular.module('myApp.controllerListenFamilyNumbers',[]);

	app.controller('CtrlListenFamilyNumbers', function($scope, $http, $window) {


	$http.get('data/nombres-en-famille.json').success(function(data) {
		$scope.donnees = data;
	});

	$scope.play = function(son) {
		document.getElementById(son).play();
	}


});

})();
