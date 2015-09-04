(function(){   // anonymous wrapper : rien n'a besoin d'être global

	var app = angular.module('myApp.controllerCalculAdditions',[]);

	app.controller('CtrlCalculAdditions', function($scope, $http, $localStorage) {


		$scope.$storage = $localStorage;

		$scope.prenoms = $localStorage.prenoms;

		// _________________test si la variable prenomCalculAdditions existe _____________________//

		$scope.prenomCompile = $scope.prenomActuel + '-calculAdditions';

		$scope.prenomCalculAdditions = $localStorage[$scope['prenomCompile']];


		if (typeof $scope.prenomCalculAdditions != 'undefined') { // si la variable prenoms existe

		$scope.prenomCalculAdditions = $localStorage[$scope['prenomCompile']]; // lecture

		}



	  function entierAleatoire(mini, maxi) { 	// fonction : trouver un nombre entier aléatoire

  		var nb = mini + (maxi+1-mini)*Math.random();

  		return Math.floor(nb);
  	}

	$scope.effacer = function() {
		$scope.prenomCompile = $scope.prenomActuel + '-calculAdditions';
		$localStorage[$scope['prenomCompile']] = [];
		$scope.prenomCalculAdditions = [];
	}

	$scope.clearInput = function() {
		$scope.reponseEleve = '';
		$('#inputEleve').focus();
	}

	$(".pop").popover({ html : true, trigger: 'focus' }); // active le popover dans le modal : afficher la réponse

	$('#bloc-central').hide();

// attention au type de variable : 4 (number), '4' (string)
	$scope.niveaux = [
	{ "nbMin" : 1, "nbMax" : 4, "sommeMax" : 5,"nbDeCalculs" : 5 },
	{ "nbMin" : 1, "nbMax" : 4, "sommeMax" : 5,"nbDeCalculs" : 10 },
	{ "nbMin" : 1, "nbMax" : 9, "sommeMax" : 10,"nbDeCalculs" : 5 },
	{ "nbMin" : 1, "nbMax" : 9, "sommeMax" : 10,"nbDeCalculs" : 10 },
	{ "nbMin" : 1, "nbMax" : 19, "sommeMax" : 20,"nbDeCalculs" : 5 },
	{ "nbMin" : 1, "nbMax" : 19, "sommeMax" : 20,"nbDeCalculs" : 10 },
	{ "nbMin" : 0, "nbMax" : 50, "sommeMax" : 50,"nbDeCalculs" : 5 },
	{ "nbMin" : 0, "nbMax" : 50, "sommeMax" : 50,"nbDeCalculs" : 10 },
	{ "nbMin" : 0, "nbMax" : 100, "sommeMax" : 100,"nbDeCalculs" : 5 },
	{ "nbMin" : 0, "nbMax" : 100, "sommeMax" : 100,"nbDeCalculs" : 10 },
	{ "nbMin" : 0, "nbMax" : 500, "sommeMax" : 500,"nbDeCalculs" : 5 },
	{ "nbMin" : 0, "nbMax" : 500, "sommeMax" : 500,"nbDeCalculs" : 10 },
	{ "nbMin" : 0, "nbMax" : 1000, "sommeMax" : 1000,"nbDeCalculs" : 5 },
	{ "nbMin" : 0, "nbMax" : 1000, "sommeMax" : 1000,"nbDeCalculs" : 10 }
	];

	$('#bravo').css('visibility', 'hidden');
	$('#bilan').hide();

	// -------------------------- fonctions ------------------------------------------//

	$scope.initialise = function(nbMin, nbMax,sommeMax, nbDeCalculs, serie) { // ------------------------ fonction initialise()

		$('#bravo').css('visibility', 'hidden');
		$('#bilan').hide();
		$scope.k = 0;

		$scope.serie = serie;

		$scope.nbErreur = 0;

		$scope.tauxReussite = '';

		$scope.tauxErreur = '';

		$scope.s = ''; // s à erreur dans le bilan ex : 0 erreur , 3 erreurs

		$scope.score = 0;

		$scope.nbMin = nbMin;
		$scope.nbMax = nbMax;
		$scope.sommeMax = sommeMax;
		$scope.nbDeCalculs = nbDeCalculs;
		$('#bloc-central').show();

		$scope.nouveauCalcul(false);
	}

	$scope.nouveauCalcul = function(paramAlertSuccess) { // --------------fonction nouveauCalcul()

		if (paramAlertSuccess===true) { // si on vient de réussir, affichage Alert Success

			$('#bravo').css('visibility', 'visible');
		}

		$('#reponse').focus();

		$scope.nombre1 = entierAleatoire( $scope['nbMin'] , $scope['nbMax'] );

		$scope.nombre2 = entierAleatoire( $scope['nbMin'] , $scope['nbMax'] );

		$scope.somme = $scope.nombre1 + $scope.nombre2;

		while ($scope.somme > $scope.sommeMax) {
			$scope.nombre1 = entierAleatoire( $scope['nbMin'] , $scope['nbMax'] );

			$scope.nombre2 = entierAleatoire( $scope['nbMin'] , $scope['nbMax'] );

			$scope.somme = $scope.nombre1 + $scope.nombre2;
		}


	}

	$scope.check = function(reponse) { // --------------------- fonction check()

		if ($scope.reponse) { // si l'input n'est pas vide ou rempli d'espaces

			$scope.reponseEleve = reponse;

			if (reponse===$scope.somme) { // si c'est juste

				$scope.score ++;

				$scope.decide(true);
			}
			else { // si erreur

				$('#modalError').modal('show');

				$('#bravo').css('visibility', 'hidden');

				$('#modalError').on('shown.bs.modal', function () { // lorsque le modal est affiché
					$('#refaire').focus();
				});

				$scope.nbErreur ++;
			}
			$scope.reponse = '';
			$('#reponse').focus();
		}
	}

	$scope.decide = function(param) { // --------------------- fonction decide()

		$scope.k ++;

		if ($scope.k == $scope.nbDeCalculs) {
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

								$scope.prenomCompile = $scope.prenomActuel + '-calculAdditions';

								$scope.prenomCalculAdditions = $localStorage[$scope['prenomCompile']];


							if (typeof $scope.prenomCalculAdditions != 'undefined') { // si la variable prenoms existe

								$scope.prenomCalculAdditions[$scope.serie] = 'green';

								$localStorage[$scope['prenomCompile']] = $scope.prenomCalculAdditions; // écriture

							}
							else { // si la variable prenoms n'existe pas

								$scope.prenomCalculAdditions = [];

								$scope.prenomCalculAdditions[$scope.serie] = 'green';

								$localStorage[$scope['prenomCompile']] = $scope.prenomCalculAdditions; // mise à jour

							}

						}

						else if ($scope.note >= 0) { // sinon jaune

							$scope.prenomCompile = $scope.prenomActuel + '-calculAdditions';

							$scope.prenomCalculAdditions = $localStorage[$scope['prenomCompile']];


						if (typeof $scope.prenomCalculAdditions != 'undefined') { // si la variable prenoms existe

							$scope.prenomCalculAdditions[$scope.serie] = 'yellow';

							$localStorage[$scope['prenomCompile']] = $scope.prenomCalculAdditions; // écriture


						}
						else { // si la variable prenoms n'existe pas

							$scope.prenomCalculAdditions = [];

							$scope.prenomCalculAdditions[$scope.serie] = 'yellow';

							$localStorage[$scope['prenomCompile']] = $scope.prenomCalculAdditions; // mise à jour

						}

						}


						else if ($scope.note > -5) { // sinon orange

							$scope.prenomCompile = $scope.prenomActuel + '-calculAdditions';

							$scope.prenomCalculAdditions = $localStorage[$scope['prenomCompile']];


						if (typeof $scope.prenomCalculAdditions != 'undefined') { // si la variable prenoms existe

							$scope.prenomCalculAdditions[$scope.serie] = 'orange';

							$localStorage[$scope['prenomCompile']] = $scope.prenomCalculAdditions; // écriture


						}
						else { // si la variable prenoms n'existe pas

							$scope.prenomCalculAdditions = [];

							$scope.prenomCalculAdditions[$scope.serie] = 'orange';

							$localStorage[$scope['prenomCompile']] = $scope.prenomCalculAdditions; // mise à jour

						}

						}

						else { // sinon rouge

							$scope.prenomCompile = $scope.prenomActuel + '-calculAdditions';

							$scope.prenomCalculAdditions = $localStorage[$scope['prenomCompile']];


						if (typeof $scope.prenomCalculAdditions != 'undefined') { // si la variable prenoms existe

							$scope.prenomCalculAdditions[$scope.serie] = 'red';

							$localStorage[$scope['prenomCompile']] = $scope.prenomCalculAdditions; // écriture


						}
						else { // si la variable prenoms n'existe pas

							$scope.prenomCalculAdditions = [];

							$scope.prenomCalculAdditions[$scope.serie] = 'red';

							$localStorage[$scope['prenomCompile']] = $scope.prenomCalculAdditions; // mise à jour

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
