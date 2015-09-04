(function(){   // anonymous wrapper : rien n'a besoin d'être global

	var app = angular.module('myApp.controllerListenImagesEn',[]);

	app.controller('CtrlListenImagesEn', function($scope, $http, $window) {

	$http.get('data/images-en.json').success(function(data) {
	   $scope.images = data;
	});

	$scope.play = function(son) {
		document.getElementById(son).play();
	}

		// -------------------------- fonctions ------------------------------------------//

	var shuffleArray = function(array) { // Mélange un tableau
		var m = array.length, t, i;

		// While there remain elements to shuffle
		while (m) {
		// Pick a remaining element…
		i = Math.floor(Math.random() * m--);

		// And swap it with the current element.
		t = array[m];
		array[m] = array[i];
		array[i] = t;
		}
		return array;
	}

	$scope.initialise = function(serie) { // ------------------------ fonction initialise()

		$scope.serie = serie;

		$scope.images_aleatoires = [];

		$scope.images_aleatoires = $scope.images[serie].slice();	 // on duplique les mots de la série

		shuffleArray($scope.images_aleatoires);

	}

});

})();
