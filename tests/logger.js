var logger = (function () {

	var addTo = function (obj, name) {
		var oldFunc = obj[name];

		obj[name] = function () {
			console.log('Before calling function ' + name);

			var result = oldFunc();

			console.log('After calling function ' + name);

			return result;
		};

		return obj[name];
	};

	return {
		add: addTo
	};
}());