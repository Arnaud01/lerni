(function(){   // anonymous wrapper : rien n'a besoin d'être global

	var app = angular.module('myApp.controllerReadSyllables',[]);

	app.controller('CtrlReadSyllables', function($scope, $http, $localStorage) {

	$scope.$storage = $localStorage;


	$('#bravo').css('visibility', 'hidden');
	$('#bloc-central').hide();
	$('#bilan').hide();

	$http.get('data/syllabes.json').success(function(data) { // récupère les données json
	   $scope.syllabes = data;
	});


	// $scope.lireSyllabes = [true,false,true,false,false,true,false,false,false,true,false,true,true,false,false,true,false,false,false,true,false,true,true,false,false,true,false,false,false,true];

	// $scope.prenomLireSyllabes = ['green','yellow','orange','red','orange','green','yellow','red','orange',true,false,true,true,false,false,true,false,false,false,true,false,true,true,false,false,true,false,false,false,true];


	$scope.prenoms = $localStorage.prenoms;

	// _________________test si la variable prenomLireSyllabes existe _____________________//

			$scope.prenomCompile = $scope.prenomActuel + '-lireSyllabes';

			$scope.prenomLireSyllabes = $localStorage[$scope['prenomCompile']];


			if (typeof $scope.prenomLireSyllabes != 'undefined') { // si la variable prenoms existe

			$scope.prenomLireSyllabes = $localStorage[$scope['prenomCompile']]; // lecture

			//	$scope.prenomLireSyllabes = ['green','yellow','orange','red','orange','green','yellow','red','orange',true,false,true,true,false,false,true,false,false,false,true,false,true,true,false,false,true,false,false,false,true];

			}


		// -------------------------- fonctions ------------------------------------------//

		$scope.hear = function() {

			var audio = document.createElement('audio');

			var source= document.createElement('source');

			if (audio.canPlayType('audio/ogg;')) {
				source.type= 'audio/ogg';
				source.src= 'sounds/syllabes/' + $scope.syllabes[$scope.serie][$scope.n] + '.ogg';

			} else {
				source.type= 'audio/mpeg';
				source.src= 'sounds/syllabes/' + $scope.syllabes[$scope.serie][$scope.n] + '.mp3';
			}

			audio.appendChild(source);

			audio.play();

		}

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


		$scope.initialise = function(serie,ligne,ecriture) { // ---------------------- fonction initialise()

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

		$scope.ligne = ligne;

		$scope.ecriture = ecriture;

		$scope.display();

	}


		$scope.display = function(paramAlertSuccess) { // --------------fonction display()

		if (paramAlertSuccess===true) { // si on vient de réussir, affichage Alert Success

			$('#bravo').css('visibility', 'visible');
		}

		$scope.hear();

		$('#reponse').focus();

	}


		$scope.check = function(reponse) { // --------------------- fonction check()

			$scope.reponseEleve = reponse;

			$scope.resultat = $scope.syllabes[$scope.serie][$scope.n];


			if (reponse===$scope.resultat) { // si c'est juste

				$('#bravo').css('visibility', 'visible');
				$('#erreur').css('visibility', 'hidden');

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

		$scope.decide = function(param) { // --------------------- fonction decide()

		$scope.k ++;

		$scope.n ++;

		//alert($scope.nbErreur);

		//alert($scope.k);

		//alert($scope.n);



		if ($scope.k==$scope.l) {
			// fin de la série : bilan


					/*
		 *
		 *
		 *
		 *
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

		//alert($scope.note);

			$('#bloc-central').hide();
			$('#bravo').css('visibility', 'hidden');
			$('#bilan').show();

			if ($scope.nbErreur > 1) {
				$scope.s = 's';
			}

			// alert($scope.nbErreur);

			if ($scope.note == 10) { // si tout est juste : valider la série

				// alert($scope.ligne);


				$scope.prenomCompile = $scope.prenomActuel + '-lireSyllabes';

				// $localStorage[$scope['prenomCompile']] = $scope.lireSyllabes;

				$scope.prenomLireSyllabes = $localStorage[$scope['prenomCompile']];

				// alert($scope.prenomLireSyllabes);


			if (typeof $scope.prenomLireSyllabes != 'undefined') { // si la variable prenoms existe

				// alert('prenom lire syllabes existe');

				$scope.prenomLireSyllabes[$scope.ligne] = 'green';

				$localStorage[$scope['prenomCompile']] = $scope.prenomLireSyllabes; // écriture


			}
			else { // si la variable prenoms n'existe pas

				// alert('prenom lire syllabes existe pas');

				$scope.prenomLireSyllabes = [];

				$scope.prenomLireSyllabes[$scope.ligne] = 'green';

				$localStorage[$scope['prenomCompile']] = $scope.prenomLireSyllabes; // mise à jour

			}

			}

			else if ($scope.note >= 0) { // si tout est juste : valider la série

				// alert($scope.ligne);


				$scope.prenomCompile = $scope.prenomActuel + '-lireSyllabes';

				// $localStorage[$scope['prenomCompile']] = $scope.lireSyllabes;

				$scope.prenomLireSyllabes = $localStorage[$scope['prenomCompile']];

				// alert($scope.prenomLireSyllabes);


			if (typeof $scope.prenomLireSyllabes != 'undefined') { // si la variable prenoms existe

				// alert('prenom lire syllabes existe');

				$scope.prenomLireSyllabes[$scope.ligne] = 'yellow';

				$localStorage[$scope['prenomCompile']] = $scope.prenomLireSyllabes; // écriture


			}
			else { // si la variable prenoms n'existe pas

				// alert('prenom lire syllabes existe pas');

				$scope.prenomLireSyllabes = [];

				$scope.prenomLireSyllabes[$scope.ligne] = 'yellow';

				$localStorage[$scope['prenomCompile']] = $scope.prenomLireSyllabes; // mise à jour

			}

			}


			else if ($scope.note > -5) { // si tout est juste : valider la série

				// alert($scope.ligne);


				$scope.prenomCompile = $scope.prenomActuel + '-lireSyllabes';

				// $localStorage[$scope['prenomCompile']] = $scope.lireSyllabes;

				$scope.prenomLireSyllabes = $localStorage[$scope['prenomCompile']];

				// alert($scope.prenomLireSyllabes);


			if (typeof $scope.prenomLireSyllabes != 'undefined') { // si la variable prenoms existe

				// alert('prenom lire syllabes existe');

				$scope.prenomLireSyllabes[$scope.ligne] = 'orange';

				$localStorage[$scope['prenomCompile']] = $scope.prenomLireSyllabes; // écriture


			}
			else { // si la variable prenoms n'existe pas

				// alert('prenom lire syllabes existe pas');

				$scope.prenomLireSyllabes = [];

				$scope.prenomLireSyllabes[$scope.ligne] = 'orange';

				$localStorage[$scope['prenomCompile']] = $scope.prenomLireSyllabes; // mise à jour

			}

			}

			else { // si tout est juste : valider la série

				// alert($scope.ligne);


				$scope.prenomCompile = $scope.prenomActuel + '-lireSyllabes';

				// $localStorage[$scope['prenomCompile']] = $scope.lireSyllabes;

				$scope.prenomLireSyllabes = $localStorage[$scope['prenomCompile']];

				// alert($scope.prenomLireSyllabes);


			if (typeof $scope.prenomLireSyllabes != 'undefined') { // si la variable prenoms existe

				// alert('prenom lire syllabes existe');

				$scope.prenomLireSyllabes[$scope.ligne] = 'red';

				$localStorage[$scope['prenomCompile']] = $scope.prenomLireSyllabes; // écriture


			}
			else { // si la variable prenoms n'existe pas

				// alert('prenom lire syllabes existe pas');

				$scope.prenomLireSyllabes = [];

				$scope.prenomLireSyllabes[$scope.ligne] = 'red';

				$localStorage[$scope['prenomCompile']] = $scope.prenomLireSyllabes; // mise à jour

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

	$scope.effacer = function() {
		$scope.prenomCompile = $scope.prenomActuel + '-lireSyllabes';
		$localStorage[$scope['prenomCompile']] = [];
		$scope.prenomLireSyllabes = [];
	}

});

})();
