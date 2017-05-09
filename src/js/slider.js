(function() {

	window.App = window.App || {};

	App.slider = (function() {

		function init() {
			console.log('init slider');
		}

		return { 
			init: init
		};

	}());

	App.slider.init();

}());