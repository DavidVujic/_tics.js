/* exported calls */
var calls = (function () {

	var addTo = function (obj, name) {
		var oldFunc = obj[name];

		obj[name] = function () {
			var args = (arguments.length === 1 ? [arguments[0]] : Array.prototype.slice.call(arguments, 0));

			obj[name].calls += 1;

			var result = oldFunc.apply(null, args);

			return result;
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
