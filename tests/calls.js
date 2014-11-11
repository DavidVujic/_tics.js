var calls = (function () {

	var addTo = function (obj, name) {
		var oldFunc = obj[name];

		obj[name] = function () {			
			obj[name].calls += 1;
			
			return oldFunc();
		};

		if (!obj[name].calls) {
			obj[name].calls = 0;
		}

		for (var prop in oldFunc) {
			obj[name][prop] = oldFunc[prop];
		}

		return obj[name];
	};

	return {
		add: addTo
	};
}());