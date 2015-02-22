(function(){ // anonymous wrapper : rien n'a besoin d'être global
	
	var app = angular.module('myApp.controllerReadNumbers',[]);
	
	app.controller('CtrlReadNumbers', function($scope, $http, $localStorage) {
	
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
	
	$scope.playAudio = function() {
		audio.play();
	}
	
	$('#bravo').css('visibility', 'hidden');
	$('#bloc-central').hide();
	$('#bilan').hide();

$http.get('data/nombres.json').success(function(data) {
   $scope.nombres = data;
});
	
	$scope.prenoms = $localStorage.prenoms;
	
	// _________________test si la variable prenomLireNombres existe _____________________//
	
			$scope.prenomCompile = $scope.prenomActuel + '-lireNombres';
				
			$scope.prenomLireNombres = $localStorage[$scope['prenomCompile']];


			if (typeof $scope.prenomLireNombres != 'undefined') { // si la variable prenoms existe
			
			$scope.prenomLireNombres = $localStorage[$scope['prenomCompile']]; // lecture
				
			//	$scope.prenomLireNombres = ['green','yellow','orange','red','orange','green','yellow','red','orange',true,false,true,true,false,false,true,false,false,false,true,false,true,true,false,false,true,false,false,false,true];

			}

	
		// -------------------------- fonctions ------------------------------------------//
	
		$scope.initialise = function(serie) { // ---------------------- fonction initialise()

		$('#bravo').css('visibility', 'hidden');
		$('#bilan').hide();
		
		$scope.serie_aleatoire = $scope.nombres[serie].slice();	 // on duplique les mots humains de la série
		
		shuffleArray($scope.serie_aleatoire);
		
		$scope.l = $scope.nombres[serie].length; // le nombre de syllabes dans la série
		
		$scope.n = 0;
		
		$scope.k = 0;
		
		$scope.nbErreur = 0;
		
		$scope.tauxReussite = '';
		
		$scope.tauxErreur = '';
		
		$scope.s = ''; // s à erreur dans le bilan ex : 0 erreur , 3 erreurs
		
		$scope.score = 0;
		
		$('#bloc-central').show();
		
		$scope.serie = serie;
		
		$scope.ligne = serie;
		
		$scope.affiche();
		
	}
	
	
		$scope.affiche = function(paramAlertSuccess) { // --------------fonction affiche()
		
		if (paramAlertSuccess===true) { // si on vient de réussir, affichage Alert Success

			$('#bravo').css('visibility', 'visible');
		}
		
		var son = new Audio('sounds/nombres/' + $scope.nombres[$scope.serie][$scope.n] + '.ogg');
		
		son.play();
		
		$('#reponse').focus();

	}
	
	
		$scope.check = function(reponse) { // --------------------- fonction check()
			
			$scope.reponseEleve = reponse;
			
			$scope.resultat = $scope.nombres[$scope.serie][$scope.n];
			
			
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
				
			
				$scope.prenomCompile = $scope.prenomActuel + '-lireNombres';
	
				// $localStorage[$scope['prenomCompile']] = $scope.lireNombres; 
				
				$scope.prenomLireNombres = $localStorage[$scope['prenomCompile']];
				
				// alert($scope.prenomLireNombres);


			if (typeof $scope.prenomLireNombres != 'undefined') { // si la variable prenoms existe
			
				// alert('prenom lire syllabes existe');
			
				$scope.prenomLireNombres[$scope.ligne] = 'green';
			
				$localStorage[$scope['prenomCompile']] = $scope.prenomLireNombres; // écriture


			}
			else { // si la variable prenoms n'existe pas
			
				// alert('prenom lire syllabes existe pas');
				
				$scope.prenomLireNombres = [];
				
				$scope.prenomLireNombres[$scope.ligne] = 'green';
				
				$localStorage[$scope['prenomCompile']] = $scope.prenomLireNombres; // mise à jour
				
			}
				
			}
			
			else if ($scope.note >= 0) { // si tout est juste : valider la série
				
				// alert($scope.ligne);
				
			
				$scope.prenomCompile = $scope.prenomActuel + '-lireNombres';
	
				// $localStorage[$scope['prenomCompile']] = $scope.lireNombres; 
				
				$scope.prenomLireNombres = $localStorage[$scope['prenomCompile']];
				
				// alert($scope.prenomLireNombres);


			if (typeof $scope.prenomLireNombres != 'undefined') { // si la variable prenoms existe
			
				// alert('prenom lire syllabes existe');
			
				$scope.prenomLireNombres[$scope.ligne] = 'yellow';
			
				$localStorage[$scope['prenomCompile']] = $scope.prenomLireNombres; // écriture


			}
			else { // si la variable prenoms n'existe pas
			
				// alert('prenom lire syllabes existe pas');
				
				$scope.prenomLireNombres = [];
				
				$scope.prenomLireNombres[$scope.ligne] = 'yellow';
				
				$localStorage[$scope['prenomCompile']] = $scope.prenomLireNombres; // mise à jour
				
			}
				
			}
			
			
			else if ($scope.note > -5) { // si tout est juste : valider la série
				
				// alert($scope.ligne);
				
			
				$scope.prenomCompile = $scope.prenomActuel + '-lireNombres';
	
				// $localStorage[$scope['prenomCompile']] = $scope.lireNombres; 
				
				$scope.prenomLireNombres = $localStorage[$scope['prenomCompile']];
				
				// alert($scope.prenomLireNombres);


			if (typeof $scope.prenomLireNombres != 'undefined') { // si la variable prenoms existe
			
				// alert('prenom lire syllabes existe');
			
				$scope.prenomLireNombres[$scope.ligne] = 'orange';
			
				$localStorage[$scope['prenomCompile']] = $scope.prenomLireNombres; // écriture


			}
			else { // si la variable prenoms n'existe pas
			
				// alert('prenom lire syllabes existe pas');
				
				$scope.prenomLireNombres = [];
				
				$scope.prenomLireNombres[$scope.ligne] = 'orange';
				
				$localStorage[$scope['prenomCompile']] = $scope.prenomLireNombres; // mise à jour
				
			}
				
			}

			else { // si tout est juste : valider la série
				
				// alert($scope.ligne);
				
			
				$scope.prenomCompile = $scope.prenomActuel + '-lireNombres';
	
				// $localStorage[$scope['prenomCompile']] = $scope.lireNombres; 
				
				$scope.prenomLireNombres = $localStorage[$scope['prenomCompile']];
				
				// alert($scope.prenomLireNombres);


			if (typeof $scope.prenomLireNombres != 'undefined') { // si la variable prenoms existe
			
				// alert('prenom lire syllabes existe');
			
				$scope.prenomLireNombres[$scope.ligne] = 'red';
			
				$localStorage[$scope['prenomCompile']] = $scope.prenomLireNombres; // écriture


			}
			else { // si la variable prenoms n'existe pas
			
				// alert('prenom lire syllabes existe pas');
				
				$scope.prenomLireNombres = [];
				
				$scope.prenomLireNombres[$scope.ligne] = 'red';
				
				$localStorage[$scope['prenomCompile']] = $scope.prenomLireNombres; // mise à jour
				
			}
				
			}
			
		}
		else {
			if (param===true) { // si on vient de réussir
				$scope.affiche(true);
			}
			else { // si erreur et clic sur continuer
				$scope.affiche(false);
			}
		}
		
	}
	
	$scope.effacer = function() {
		$scope.prenomCompile = $scope.prenomActuel + '-lireNombres';
		$localStorage[$scope['prenomCompile']] = [];
		$scope.prenomLireNombres = [];
	}
	
});


	
})();
