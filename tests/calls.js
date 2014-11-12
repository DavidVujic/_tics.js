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

		return obj[name];
	};

	return {
		add: addTo
	};
}());