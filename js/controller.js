(function(){   // anonymous wrapper : rien n'a besoin d'être global

	var app = angular.module('myApp.controller', []);

	app.controller('Ctrl', function($scope, $http, $localStorage, $location) {

	$scope.$storage = $localStorage;

    /*
    $http.get('data/firstnames.json').success(function(firstnames) {

		$scope.users = firstnames;

	});
	*/

	$('#myModal').modal('show') ; // Affiche le modal à l'affichage de la page

	$('#myModal').on('shown.bs.modal', function () {

		// $('#inputprenom').focus(); // Donne le focus à l'input prénom

		// je l'ai volontairement désactivé pour inciter les enfants à lire les étiquettes plutôt qu'à écrire une deuxième fois leur prénom
	})


	// ====================== Ne pas oublier $scope devant les variables dans le contrôleur ========== //

	// ================================== Fonctions ====================================//

	$scope.ajoute = function(prenom) {

		 if ($scope.prenom) { // si l'input n'est pas vide ou rempli d'espaces

			 $('#myModal').modal('hide');

			$scope.prenoms = $localStorage.prenoms; // ne pas enlever !


			if (typeof $scope.prenoms != 'undefined') { // si la variable prenoms existe

				$scope.prenoms = $localStorage.prenoms; // lecture

				$scope.prenoms.push(prenom);				// ajout du texte dans l'input à la fin du tableau

				$scope.prenomActuel = $scope.prenom;  		// mise à jour du prénom en haut à droite {{prenomActuel}}

				$localStorage.prenoms = $scope.prenoms; // écriture

				$scope.prenom = '';

			}
			else { // si la variable prenoms n'existe pas

				$scope.prenoms = [prenom];

				$scope.prenomActuel = $scope.prenom; 	// mise à jour du prénom en haut à droite {{prenomActuel}}

				$localStorage.prenoms = $scope.prenoms; // création de la variable localStorage prenoms

				$scope.prenom = '';
			}
		}

	};

	$scope.choixPrenom = function(item) {

		$scope.prenomActuel = item;  // je ne comprends pas pourquoi il ne faut pas mettre $scope.item
		// prenom ou $scope.prenom fonctionne mais item fonctionne et pas $scope.item
		// peut-être parce qu'il n'y a pas de directive ng-model="item" mais une directive ng-model="prenom"

		// $scope.prenomCompile = $scope.prenomActuel + '-lireSyllabes';

		// $scope.prenomLireSyllabes = $localStorage[$scope['prenomCompile']];

	}

	$scope.getClass = function (path) { // ----- donne la class active au menu actuel
		if(path === '/') {
			if($location.path() === '/') {
				return "active";
			} else {
				return "";
			}
		}

		if ($location.path().substr(0, path.length) === path) {
			return "active";
		} else {
			return "";
		}
	}

	$scope.deleteAccount = function() { // supprime le compte

	$scope.prenomCompile = $scope.prenomActuel + '-lireSyllabes';
	delete $localStorage[$scope['prenomCompile']];
	$scope.prenomLireSyllabes = [];

	$scope.prenomCompile = $scope.prenomActuel + '-lireLettres';
	delete $localStorage[$scope['prenomCompile']];
	$scope.prenomLireLettres = [];

	$scope.prenomCompile = $scope.prenomActuel + '-lireMots';
	delete $localStorage[$scope['prenomCompile']];
	$scope.prenomLireMots = [];

	$scope.prenomCompile = $scope.prenomActuel + '-ecrireSyllabes';
	delete $localStorage[$scope['prenomCompile']];
	$scope.prenomEcrireSyllabes = [];

	$scope.prenomCompile = $scope.prenomActuel + '-ecrireLettres';
	delete $localStorage[$scope['prenomCompile']];
	$scope.prenomEcrireLettres = [];

	$scope.prenomCompile = $scope.prenomActuel + '-ecrireMots';
	delete $localStorage[$scope['prenomCompile']];
	$scope.prenomEcrireMots = [];

	$scope.prenomCompile = $scope.prenomActuel + '-lireNombres';
	delete $localStorage[$scope['prenomCompile']];
	$scope.prenomLireNombres = [];

	$scope.prenomCompile = $scope.prenomActuel + '-ecrireNombres';
	delete $localStorage[$scope['prenomCompile']];
	$scope.prenomEcrireNombres = [];

	$scope.prenomCompile = $scope.prenomActuel + '-tablesAddition';
	delete $localStorage[$scope['prenomCompile']];
	$scope.prenomTablesAddition = [];

	$scope.prenomCompile = $scope.prenomActuel + '-calculAdditions';
	delete $localStorage[$scope['prenomCompile']];
	$scope.prenomCalculAdditions = [];

	$scope.prenoms = $localStorage.prenoms;	// lecture

	$scope.indexPrenom = $scope.prenoms.indexOf($scope.prenomActuel); // trouver l'index dans le tableau prenoms du prénom à supprimer

	$scope.prenoms.splice( $scope.indexPrenom, 1 );

	$localStorage.prenoms = $scope.prenoms; // écriture

	$scope.prenomActuel = '';

	}

});

})();



// ================= Attention : ajouter le bon contrôleur dans app.js ============================ //
// ================= pour qu'il soit chargé en même temps que cette vue partielle ============================ //
