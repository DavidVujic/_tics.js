var interceptor = (function () {
	'use strict';

	var eachItem = function (obj, func) {
		var that = obj;

		for (var prop in obj) {
			if (!obj.hasOwnProperty(prop)) {
				continue;
			}

			if (typeof obj[prop] === 'function') {
				that[prop] = func(obj, prop);
			} else {
				that[prop] = obj[prop];
			}			
		}

		return that;
	};

	var addTo = function (obj, interceptor) {
		return eachItem(obj, interceptor);
	};

	return {
		add: addTo
	};
}());