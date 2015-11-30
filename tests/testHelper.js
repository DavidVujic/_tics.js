/* exported testHelper */
var testHelper = (function () {

	var createInput = function (id) {
		var input = window.document.createElement('input');
		input.type = 'text';
		input.className = 'element-added';
		input.id = id;

		window.document.getElementsByTagName('body')[0].appendChild(input);
	};

	var remove = function () {
		var elementsAdded = window.document.querySelectorAll('.element-added');
		var i;

		for (i = 0; i < elementsAdded.length; i += 1) {
			elementsAdded[i].parentNode.removeChild(elementsAdded[i]);
		}
	};

	return {
		createInputField: createInput,
		clearAdded: remove
	};
}());
