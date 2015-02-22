(function(){  // anonymous wrapper : rien n'a besoin d'être global
	
	var app = angular.module('myApp.controllerWriteLetters',[]);
	
	
	app.controller('CtrlWriteLetters', function($scope, $http, $localStorage) {
	
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

$http.get('data/lettres.json').success(function(data) {
   $scope.lettres = data;
});


	
	$scope.prenoms = $localStorage.prenoms;
	
	// _________________test si la variable prenomEcrireLettres existe _____________________//
	
			$scope.prenomCompile = $scope.prenomActuel + '-ecrireLettres';
				
			$scope.prenomEcrireLettres = $localStorage[$scope['prenomCompile']];


			if (typeof $scope.prenomEcrireLettres != 'undefined') { // si la variable prenoms existe
			
			$scope.prenomEcrireLettres = $localStorage[$scope['prenomCompile']]; // lecture
				
			}

	
		// -------------------------- fonctions ------------------------------------------//
	
		$scope.initialise = function(serie) { // ---------------------- fonction initialise()

		$('#bravo').css('visibility', 'hidden');
		$('#bilan').hide();
		
		$scope.serie_aleatoire = $scope.lettres[serie].slice();	 // on duplique les mots humains de la série
		
		shuffleArray($scope.serie_aleatoire);
		
		$scope.l = $scope.lettres[serie].length; // le nombre de lettres dans la série
		
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
		
		$scope.affiche();
		
	}
	
	
		$scope.affiche = function(paramAlertSuccess) { // --------------fonction affiche()
		
		if (paramAlertSuccess===true) { // si on vient de réussir, affichage Alert Success

			$('#bravo').css('visibility', 'visible');
		}
		
		var son = new Audio('sounds/lettres/' + $scope.serie_aleatoire[$scope.n] + '.ogg');
			
		son.play();
		
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
	* nb réussi / nb de lettres * 10  - le nombre d'erreur
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
				
					$scope.prenomCompile = $scope.prenomActuel + '-ecrireLettres';
					
					$scope.prenomEcrireLettres = $localStorage[$scope['prenomCompile']];


				if (typeof $scope.prenomEcrireLettres != 'undefined') { // si la variable prenoms existe
				
					$scope.prenomEcrireLettres[$scope.serie] = 'green';
				
					$localStorage[$scope['prenomCompile']] = $scope.prenomEcrireLettres; // écriture

				}
				else { // si la variable prenoms n'existe pas
					
					$scope.prenomEcrireLettres = [];
					
					$scope.prenomEcrireLettres[$scope.serie] = 'green';
					
					$localStorage[$scope['prenomCompile']] = $scope.prenomEcrireLettres; // mise à jour
					
				}
				
			}
			
			else if ($scope.note >= 0) { // sinon jaune
				
				$scope.prenomCompile = $scope.prenomActuel + '-ecrireLettres';
				
				$scope.prenomEcrireLettres = $localStorage[$scope['prenomCompile']];


			if (typeof $scope.prenomEcrireLettres != 'undefined') { // si la variable prenoms existe
			
				$scope.prenomEcrireLettres[$scope.serie] = 'yellow';
			
				$localStorage[$scope['prenomCompile']] = $scope.prenomEcrireLettres; // écriture


			}
			else { // si la variable prenoms n'existe pas
				
				$scope.prenomEcrireLettres = [];
				
				$scope.prenomEcrireLettres[$scope.serie] = 'yellow';
				
				$localStorage[$scope['prenomCompile']] = $scope.prenomEcrireLettres; // mise à jour
				
			}
				
			}
			
			
			else if ($scope.note > -5) { // sinon orange			
			
				$scope.prenomCompile = $scope.prenomActuel + '-ecrireLettres';
				
				$scope.prenomEcrireLettres = $localStorage[$scope['prenomCompile']];


			if (typeof $scope.prenomEcrireLettres != 'undefined') { // si la variable prenoms existe
			
				$scope.prenomEcrireLettres[$scope.serie] = 'orange';
			
				$localStorage[$scope['prenomCompile']] = $scope.prenomEcrireLettres; // écriture


			}
			else { // si la variable prenoms n'existe pas
				
				$scope.prenomEcrireLettres = [];
				
				$scope.prenomEcrireLettres[$scope.serie] = 'orange';
				
				$localStorage[$scope['prenomCompile']] = $scope.prenomEcrireLettres; // mise à jour
				
			}
				
			}

			else { // sinon rouge
			
				$scope.prenomCompile = $scope.prenomActuel + '-ecrireLettres'; 
				
				$scope.prenomEcrireLettres = $localStorage[$scope['prenomCompile']];


			if (typeof $scope.prenomEcrireLettres != 'undefined') { // si la variable prenoms existe
			
				$scope.prenomEcrireLettres[$scope.serie] = 'red';
			
				$localStorage[$scope['prenomCompile']] = $scope.prenomEcrireLettres; // écriture


			}
			else { // si la variable prenoms n'existe pas
				
				$scope.prenomEcrireLettres = [];
				
				$scope.prenomEcrireLettres[$scope.serie] = 'red';
				
				$localStorage[$scope['prenomCompile']] = $scope.prenomEcrireLettres; // mise à jour
				
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
	
	$scope.redo = function() { // ---------------- fonction refaire
		$('#modalError').on('hidden.bs.modal', function () { // lorsque le modal est caché
			$('#inputEleve').focus();
		})
		
		var son = new Audio('sounds/syllabes/' + $scope.serie_aleatoire[$scope.n] + '.ogg');
			
		son.play();
	}
	
	$scope.effacer = function() {
		$scope.prenomCompile = $scope.prenomActuel + '-ecrireLettres';
		$localStorage[$scope['prenomCompile']] = [];
		$scope.prenomEcrireLettres = [];
	}
	
	$scope.clearInput = function() {
		$scope.reponseEleve = '';
		$('#inputEleve').focus();
	}
	
});


	
})();
