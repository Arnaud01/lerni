(function(){   // anonymous wrapper : rien n'a besoin d'être global

	var app = angular.module('myApp.controllerTablesMultiplication',[]);

	app.controller('CtrlTablesMultiplication', function($scope, $http, $localStorage) {


		$scope.$storage = $localStorage;

		$scope.prenoms = $localStorage.prenoms;

		// _________________test si la variable prenomTablesMultiplication existe _____________________//

		$scope.prenomCompile = $scope.prenomActuel + '-tablesMultiplication';

		$scope.prenomTablesMultiplication = $localStorage[$scope['prenomCompile']];


		if (typeof $scope.prenomTablesMultiplication != 'undefined') { // si la variable prenoms existe

		$scope.prenomTablesMultiplication = $localStorage[$scope['prenomCompile']]; // lecture

		}


		$scope.nombres0a10 = [0,1,2,3,4,5,6,7,8,9,10];


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

	$scope.effacer = function() {
		$scope.prenomCompile = $scope.prenomActuel + '-tablesMultiplication';
		$localStorage[$scope['prenomCompile']] = [];
		$scope.prenomTablesMultiplication = [];
	}

	$scope.clearInput = function() {
		$scope.reponseEleve = '';
		$('#inputEleve').focus();
	}

	$(".pop").popover({ html : true, trigger: 'focus' }); // active le popover dans le modal : afficher la réponse

	$('#bloc-central').hide();

// attention au type de variable : 4 (number), '4' (string)
	$scope.niveaux = [
	{ "table" : 1 },
	{ "table" : 1 },
	{ "table" : 1 },
	{ "table" : 1 },
	{ "table" : 1 },
	{ "table" : 1 },
	{ "table" : 1 },
	{ "table" : 1 },
	{ "table" : 1 },
	{ "table" : 1 }
	];

	$('#bravo').css('visibility', 'hidden');
	$('#bilan').hide();

	// -------------------------- fonctions ------------------------------------------//

	$scope.initialise = function(serie) { // ------------------------ fonction initialise()

		$('#bravo').css('visibility', 'hidden');
		$('#bilan').hide();

		$scope.nombres0a10_aleatoire = $scope.nombres0a10.slice();	 // on duplique les mots humains de la série

		shuffleArray($scope.nombres0a10_aleatoire);

		$scope.l = 11; // le nombre de nombres dans la série

		$scope.n = 0;

		$scope.k = 0;

		$scope.serie = serie;

		$scope.nbErreur = 0;

		$scope.tauxReussite = '';

		$scope.tauxErreur = '';

		$scope.s = ''; // s à erreur dans le bilan ex : 0 erreur , 3 erreurs

		$scope.score = 0;

		$('#bloc-central').show();

		$scope.nouveauCalcul(false);
	}

	$scope.nouveauCalcul = function(paramAlertSuccess) { // --------------fonction nouveauCalcul()

		if (paramAlertSuccess===true) { // si on vient de réussir, affichage Alert Success

			$('#bravo').css('visibility', 'visible');
		}

		$('#reponse').focus();

		// $scope.nombre1 = entierAleatoire( $scope['nbMin'] , $scope['nbMax'] );

		$scope.somme = ( $scope.serie + 1) * $scope.nombres0a10_aleatoire[$scope.n];

	}

	$scope.check = function(reponse) { // --------------------- fonction check()

	//	if ($scope.reponse) { // si l'input n'est pas vide ou rempli d'espaces
	// la ligne ci-dessus est commentée sinon le 0 ne marche pas dans l'input, or 0 x 1 = 0

			$scope.reponseEleve = reponse;

			if (reponse===$scope.somme) { // si c'est juste

				$scope.score ++;

				$scope.decide(true);
			}
			else { // si erreur

				$('#modalError').modal('show');

				$('#bravo').css('visibility', 'hidden');

				$scope.nbErreur ++;
			}
			$scope.reponse = '';
			$('#reponse').focus();
	//	}
	}

	$scope.decide = function(param) { // --------------------- fonction decide()

		$scope.k ++;

		$scope.n ++;

		if ($scope.k == $scope.l) {
			// fin de la série : bilan

			/*

			 * mode de calcul de la note :

			nb réussi / nb de syllabes * 10  - le nombre d'erreur
			*
			* max : 10
			*
			* min : - le nombre d'erreur : ex 54 erreurs : -54

			*/

			// $scope.note = $scope.score / $scope.k * 10 - $scope.nbErreur ;


			$scope.tauxReussite = $scope.score / $scope.k * 10;

			$scope.tauxErreur = $scope.nbErreur / $scope.k * 10;

			$scope.note = $scope.tauxReussite - $scope.tauxErreur ;

			// alert($scope.note);

			$('#bloc-central').hide();
			$('#bravo').css('visibility', 'hidden');
			$('#bilan').show();

			if ($scope.nbErreur > 1) {
				$scope.s = 's';
			}

						if ($scope.note == 10) { // si tout est juste : vert

								$scope.prenomCompile = $scope.prenomActuel + '-tablesMultiplication';

								$scope.prenomTablesMultiplication = $localStorage[$scope['prenomCompile']];


							if (typeof $scope.prenomTablesMultiplication != 'undefined') { // si la variable prenoms existe

								$scope.prenomTablesMultiplication[$scope.serie] = 'green';

								$localStorage[$scope['prenomCompile']] = $scope.prenomTablesMultiplication; // écriture

							}
							else { // si la variable prenoms n'existe pas

								$scope.prenomTablesMultiplication = [];

								$scope.prenomTablesMultiplication[$scope.serie] = 'green';

								$localStorage[$scope['prenomCompile']] = $scope.prenomTablesMultiplication; // mise à jour

							}

						}

						else if ($scope.note >= 0) { // sinon jaune

							$scope.prenomCompile = $scope.prenomActuel + '-tablesMultiplication';

							$scope.prenomTablesMultiplication = $localStorage[$scope['prenomCompile']];


						if (typeof $scope.prenomTablesMultiplication != 'undefined') { // si la variable prenoms existe

							$scope.prenomTablesMultiplication[$scope.serie] = 'yellow';

							$localStorage[$scope['prenomCompile']] = $scope.prenomTablesMultiplication; // écriture


						}
						else { // si la variable prenoms n'existe pas

							$scope.prenomTablesMultiplication = [];

							$scope.prenomTablesMultiplication[$scope.serie] = 'yellow';

							$localStorage[$scope['prenomCompile']] = $scope.prenomTablesMultiplication; // mise à jour

						}

						}


						else if ($scope.note > -5) { // sinon orange

							$scope.prenomCompile = $scope.prenomActuel + '-tablesMultiplication';

							$scope.prenomTablesMultiplication = $localStorage[$scope['prenomCompile']];


						if (typeof $scope.prenomTablesMultiplication != 'undefined') { // si la variable prenoms existe

							$scope.prenomTablesMultiplication[$scope.serie] = 'orange';

							$localStorage[$scope['prenomCompile']] = $scope.prenomTablesMultiplication; // écriture


						}
						else { // si la variable prenoms n'existe pas

							$scope.prenomTablesMultiplication = [];

							$scope.prenomTablesMultiplication[$scope.serie] = 'orange';

							$localStorage[$scope['prenomCompile']] = $scope.prenomTablesMultiplication; // mise à jour

						}

						}

						else { // sinon rouge

							$scope.prenomCompile = $scope.prenomActuel + '-tablesMultiplication';

							$scope.prenomTablesMultiplication = $localStorage[$scope['prenomCompile']];


						if (typeof $scope.prenomTablesMultiplication != 'undefined') { // si la variable prenoms existe

							$scope.prenomTablesMultiplication[$scope.serie] = 'red';

							$localStorage[$scope['prenomCompile']] = $scope.prenomTablesMultiplication; // écriture


						}
						else { // si la variable prenoms n'existe pas

							$scope.prenomTablesMultiplication = [];

							$scope.prenomTablesMultiplication[$scope.serie] = 'red';

							$localStorage[$scope['prenomCompile']] = $scope.prenomTablesMultiplication; // mise à jour

						}

						}

		}
		else {
			if (param===true) { // si on vient de réussir
				$scope.nouveauCalcul(true);
			}
			else { // si erreur et clic sur continuer
				$scope.nouveauCalcul(false);
			}
		}

	}

});


})();
