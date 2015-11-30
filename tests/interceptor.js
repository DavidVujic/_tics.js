/* exported interceptor */
var interceptor = (function () {
	'use strict';

	var addProperties = function (target, source) {
		var prop;
		var that = target;

		for (prop in source) {
			if (!source.hasOwnProperty(prop)) {
				continue;
			}

			if (!that[prop]) {
				that[prop] = source[prop];
			}
		}

		return that;
	};

	var eachItem = function (obj, func) {
		var that = obj;
		var thatFunc;
		var prop;

		for (prop in obj) {
			if (!obj.hasOwnProperty(prop)) {
				continue;
			}

			thatFunc = obj[prop];

			if (typeof obj[prop] === 'function') {
				that[prop] = func(obj, prop);
				that[prop] = addProperties(that[prop], thatFunc);
			} else {
				that[prop] = thatFunc;
			}
		}

		return that;
	};

	var addTo = function (obj, interceptors) {
		var i;
		var modified;

		for (i = 0; i < interceptors.length; i += 1) {
			modified = eachItem(obj, interceptors[i]);
		}

		return modified;
	};

	return {
		add: addTo
	};
}());
