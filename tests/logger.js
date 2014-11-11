var logger = (function () {

	var addTo = function (obj, name) {
		var oldFunc = obj[name];

		obj[name] = function () {
			console.log('Before calling function ' + name);

			var result = oldFunc();

			console.log('After calling function ' + name);

			return result;
		};

		for (var prop in oldFunc) {
			obj[name][prop] = oldFunc[prop];
		}

		return obj[name];
	};

	return {
		add: addTo
	};
}());