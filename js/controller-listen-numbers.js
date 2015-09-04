(function(){ // anonymous wrapper : rien n'a besoin d'être global

	var app = angular.module('myApp.controllerListenNumbers',[]);

	app.controller('CtrlListenNumbers', function($scope, $http, $localStorage) {

	$scope.$storage = $localStorage;

	var shuffleArray = function(array) {
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

	var audio = document.getElementById('audio');

	$scope.play = function(son) {
		document.getElementById(son).play();
	}

	$('#bloc-central').hide();


$http.get('data/nombres.json').success(function(data) {
   $scope.nombres = data;
});


		// -------------------------- fonctions ------------------------------------------//

		$scope.initialise = function(serie) { // ---------------------- fonction initialise()


		$scope.serie_aleatoire = $scope.nombres[serie].slice();	 // on duplique les mots humains de la série

		shuffleArray($scope.serie_aleatoire);

		$scope.l = $scope.nombres[serie].length; // le nombre de syllabes dans la série

		$scope.n = 0;

		$scope.k = 0;

		$('#bloc-central').show();

		$scope.serie = serie;

		$scope.ligne = serie;

		$scope.affiche();

	}


		$scope.affiche = function(paramAlertSuccess) { // --------------fonction affiche()



	}

});



})();
