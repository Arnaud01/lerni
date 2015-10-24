(function(){   // anonymous wrapper : rien n'a besoin d'être global

	var app = angular.module('myApp.controllerListenAlphabet',[]);

	app.controller('CtrlListenAlphabet', function($scope, $http, $window) {


	$http.get('data/alphabet.json').success(function(data) {
		$scope.alphabet = data;
	});

	$scope.hear = function(son) {

		var audio = document.createElement('audio');

		var source= document.createElement('source');

		if (audio.canPlayType('audio/ogg;')) {
			source.type= 'audio/ogg';
			source.src= 'sounds/lettres/' + son + '.ogg';

		} else {
			source.type= 'audio/mpeg';
			source.src= 'sounds/lettres/' + son + '.mp3';
		}

		audio.appendChild(source);

		audio.play();

	}


});

})();
