(function(){  // anonymous wrapper : rien n'a besoin d'être global

	var app = angular.module('myApp.controllerWriteSyllables',[]);

	app.controller('CtrlWriteSyllables', function($scope, $http, $localStorage) {

	$scope.$storage = $localStorage;


	$('#bravo').css('visibility', 'hidden');
	$('#bloc-central').hide();
	$('#bilan').hide();

$http.get('data/syllabes.json').success(function(data) {
   $scope.syllabes = data;
});

	$scope.prenoms = $localStorage.prenoms;

	// _________________test si la variable prenomEcrireSyllabes existe _____________________//

			$scope.prenomCompile = $scope.prenomActuel + '-ecrireSyllabes';

			$scope.prenomEcrireSyllabes = $localStorage[$scope['prenomCompile']];


			if (typeof $scope.prenomEcrireSyllabes != 'undefined') { // si la variable prenoms existe

			$scope.prenomEcrireSyllabes = $localStorage[$scope['prenomCompile']]; // lecture

			}


		// -------------------------- fonctions ------------------------------------------//


		$scope.hear = function() {

			var audio = document.createElement('audio');

			var source= document.createElement('source');

			if (audio.canPlayType('audio/ogg;')) {
				source.type= 'audio/ogg';
				source.src= 'sounds/syllabes/' + $scope.serie_aleatoire[$scope.n] + '.ogg';

			} else {
				source.type= 'audio/mpeg';
				source.src= 'sounds/syllabes/' + $scope.serie_aleatoire[$scope.n] + '.mp3';
			}

			audio.appendChild(source);

			audio.play();
		}

		$scope.see = function() { // --------------fonction see()

			$('#modalSee').modal('show');


			$('#modalSee').on('shown.bs.modal', function () { // lorsque le modal est affiché
				$('#fermer').focus();
			});

			$scope.nbErreur ++;

		}

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


		$scope.initialise = function(serie) { // ---------------------- fonction initialise()

		$('#bravo').css('visibility', 'hidden');
		$('#bilan').hide();

		$scope.serie_aleatoire = $scope.syllabes[serie].slice();	 // on duplique les mots humains de la série

		shuffleArray($scope.serie_aleatoire);

		$scope.l = $scope.syllabes[serie].length; // le nombre de syllabes dans la série

		$scope.n = 0;

		$scope.k = 0;

		$scope.nbErreur = 0;

		$scope.tauxReussite = '';

		$scope.tauxErreur = '';

		$scope.s = ''; // s à erreur dans le bilan ex : 0 erreur , 3 erreurs

		$scope.score = 0;

		$('#bloc-central').show();

		$scope.serie = serie;

		$scope.bonneReponse = '';

		$scope.display();

	}


		$scope.display = function(paramAlertSuccess) { // --------------fonction display()

		if (paramAlertSuccess===true) { // si on vient de réussir, affichage Alert Success

			$('#bravo').css('visibility', 'visible');

		}

		$scope.hear();

		$('#inputEleve').focus();

		$scope.reponseEleve = '';

	}


		$scope.check = function() { // --------------------- fonction check()

		if ($scope.reponseEleve) { // si l'input n'est pas vide ou rempli d'espaces

			$scope.bonneReponse = $scope.serie_aleatoire[$scope.n];

			$scope.reponseEleve = $scope.reponseEleve.toLowerCase();

			if ($scope.reponseEleve===$scope.bonneReponse) { // si c'est juste

				$('#bravo').css('visibility', 'visible');
				$('#erreur').css('visibility', 'hidden');

				$scope.score ++;

				$scope.decide(true);

			}

			else { // si erreur

				$('#bonneReponse').show();

				$('#modalError').modal('show');

				$('#bravo').css('visibility', 'hidden');

				$('#modalError').on('shown.bs.modal', function () { // lorsque le modal est affiché
					$('#refaire').focus();
				});

				$scope.nbErreur ++;


			}
			$scope.reponse = '';
			$('#inputEleve').focus();
		}
	}

		$scope.decide = function(param) { // --------------------- fonction decide()

		$('#bonneReponse').hide();

		$scope.k ++;

		$scope.n ++;


		if ($scope.k==$scope.l) {

			// fin de la série : bilan


/*
	*
	* mode de calcul de la note :
	*
	* nb réussi / nb de syllabes * 10  - le nombre d'erreur
	*
	* max : 10
	*
	* min : - le nombre d'erreur : ex 54 erreurs : -54

*/

		// $scope.note = $scope.score / $scope.k * 10 - $scope.nbErreur ;


		$scope.tauxReussite = $scope.score / $scope.k * 10;

		$scope.tauxErreur = $scope.nbErreur / $scope.k * 10;

		$scope.note = $scope.tauxReussite - $scope.tauxErreur ;

			$('#bloc-central').hide();
			$('#bravo').css('visibility', 'hidden');
			$('#bilan').show();

			if ($scope.nbErreur > 1) {
				$scope.s = 's';
			}

			if ($scope.note == 10) { // si tout est juste : vert

					$scope.prenomCompile = $scope.prenomActuel + '-ecrireSyllabes';

					$scope.prenomEcrireSyllabes = $localStorage[$scope['prenomCompile']];


				if (typeof $scope.prenomEcrireSyllabes != 'undefined') { // si la variable prenoms existe

					$scope.prenomEcrireSyllabes[$scope.serie] = 'green';

					$localStorage[$scope['prenomCompile']] = $scope.prenomEcrireSyllabes; // écriture

				}
				else { // si la variable prenoms n'existe pas

					$scope.prenomEcrireSyllabes = [];

					$scope.prenomEcrireSyllabes[$scope.serie] = 'green';

					$localStorage[$scope['prenomCompile']] = $scope.prenomEcrireSyllabes; // mise à jour

				}

			}

			else if ($scope.note >= 0) { // sinon jaune

				$scope.prenomCompile = $scope.prenomActuel + '-ecrireSyllabes';

				$scope.prenomEcrireSyllabes = $localStorage[$scope['prenomCompile']];


			if (typeof $scope.prenomEcrireSyllabes != 'undefined') { // si la variable prenoms existe

				$scope.prenomEcrireSyllabes[$scope.serie] = 'yellow';

				$localStorage[$scope['prenomCompile']] = $scope.prenomEcrireSyllabes; // écriture


			}
			else { // si la variable prenoms n'existe pas

				$scope.prenomEcrireSyllabes = [];

				$scope.prenomEcrireSyllabes[$scope.serie] = 'yellow';

				$localStorage[$scope['prenomCompile']] = $scope.prenomEcrireSyllabes; // mise à jour

			}

			}


			else if ($scope.note > -5) { // sinon orange

				$scope.prenomCompile = $scope.prenomActuel + '-ecrireSyllabes';

				$scope.prenomEcrireSyllabes = $localStorage[$scope['prenomCompile']];


			if (typeof $scope.prenomEcrireSyllabes != 'undefined') { // si la variable prenoms existe

				$scope.prenomEcrireSyllabes[$scope.serie] = 'orange';

				$localStorage[$scope['prenomCompile']] = $scope.prenomEcrireSyllabes; // écriture


			}
			else { // si la variable prenoms n'existe pas

				$scope.prenomEcrireSyllabes = [];

				$scope.prenomEcrireSyllabes[$scope.serie] = 'orange';

				$localStorage[$scope['prenomCompile']] = $scope.prenomEcrireSyllabes; // mise à jour

			}

			}

			else { // sinon rouge

				$scope.prenomCompile = $scope.prenomActuel + '-ecrireSyllabes';

				$scope.prenomEcrireSyllabes = $localStorage[$scope['prenomCompile']];


			if (typeof $scope.prenomEcrireSyllabes != 'undefined') { // si la variable prenoms existe

				$scope.prenomEcrireSyllabes[$scope.serie] = 'red';

				$localStorage[$scope['prenomCompile']] = $scope.prenomEcrireSyllabes; // écriture


			}
			else { // si la variable prenoms n'existe pas

				$scope.prenomEcrireSyllabes = [];

				$scope.prenomEcrireSyllabes[$scope.serie] = 'red';

				$localStorage[$scope['prenomCompile']] = $scope.prenomEcrireSyllabes; // mise à jour

			}

			}

		}
		else {



			if (param===true) { // si on vient de réussir
				$scope.display(true);
			}
			else { // si erreur et clic sur continuer
				$scope.display(false);
			}
		}

	}

	$scope.redo = function() { // ---------------- fonction refaire
		$('#modalError').on('hidden.bs.modal', function () { // lorsque le modal est caché
			$('#inputEleve').focus();
		})

		$scope.hear();
	}

	$scope.close = function() { // ---------------- fonction close
		$('#modalSee').on('hidden.bs.modal', function () { // lorsque le modal est caché
			$('#inputEleve').focus();
		})

		$scope.hear();
	}

	$scope.listenAgain = function() { // ---------------- fonction réécouter
		$('#inputEleve').focus();
		$scope.hear();
	}

	$scope.clean = function() {
		$scope.prenomCompile = $scope.prenomActuel + '-ecrireSyllabes';
		$localStorage[$scope['prenomCompile']] = [];
		$scope.prenomEcrireSyllabes = [];
	}

	$scope.clearInput = function() {
		$scope.reponseEleve = '';
		$('#inputEleve').focus();
		$scope.hear();
	}

});

})();
