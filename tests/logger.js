/* exported logger */
/* eslint-disable no-console */

var logger = (function () {

	var addTo = function (obj, name) {
		var oldFunc = obj[name];

		obj[name] = function () {
			var args = (arguments.length === 1 ? [arguments[0]] : Array.prototype.slice.call(arguments, 0));

			console.log('Before: ' + name);

			console.log('args:');
			console.log(args);

			var result = oldFunc.apply(null, args);

			console.log('return value:');
			console.log(result);

			console.log('After: ' + name);

			return result;
		};

		return obj[name];
	};

	return {
		add: addTo
	};
}());
