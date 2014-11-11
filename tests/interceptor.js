var interceptor = (function () {
	'use strict';

	var eachItem = function (obj, func) {
		var mocked = obj;

		for (var prop in obj) {
			if (!obj.hasOwnProperty(prop)) {
				continue;
			}

			if (typeof obj[prop] === 'function') {
				mocked[prop] = func(obj, prop);
			} else {
				mocked[prop] = obj[prop];
			}			
		}

		return mocked;
	};

	var addTo = function (obj, interceptor) {
		return eachItem(obj, interceptor);
	};

	return {
		add: addTo
	};
}());