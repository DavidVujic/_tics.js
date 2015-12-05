var _tics = (function () {
	'use strict';

	var providers = null;

	var trackPage = function () {
		var i;

		for (i = 0; i < providers.length; i += 1) {
			providers[i].trackPage();
		}
	};

	var trackEvent = function (e) {
		var i;

		for (i = 0; i < providers.length; i += 1) {
			providers[i].track(_tics.helper.evTarget(e), _tics.helper.ev(e));
		}
	};

	var addEvent = function (selector, action) {
		if (!selector || selector.length === 0) {
			return;
		}

		if (!action || action.length === 0) {
			return;
		}

		var elements = _tics.helper.get(selector);

		if (!elements || elements.length === 0) {
			return;
		}

		_tics.helper.addListeners(elements, action, function (e) {
			trackEvent(e);
		});
	};

	var trackEvents = function () {
		addEvent('input, select, textarea', 'change');
		addEvent('a', 'click');
		addEvent('button', 'click');
	};

	var register = function (obj) {
		if (!_tics.helper.isValidProvider(obj)) {
			return;
		}

		providers.push(obj);
	};

	var initialize = function (provider) {
		providers = [];
		var i;
		var expected = 1;

		if (_tics.helper.isArray(provider)) {
			expected = provider.length;
			for (i = 0; i < provider.length; i += 1) {
				register(provider[i]);
			}
		} else {
			register(provider);
		}

		return providers.length === expected;
	};

	return {
		init: initialize,
		page: trackPage,
		events: trackEvents,
		customEvent: addEvent
	};
}());
