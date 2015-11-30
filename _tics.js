var _tics = (function () {
	'use strict';

	var provider = null;
	var helper = null;

	var trackPage = function () {
		provider.trackPage();
	};

	var trackEvent = function (e) {
		provider.track(helper.evTarget(e), helper.ev(e));
	};

	var addEvent = function (selector, action) {
		if (!selector || selector.length === 0) {
			return;
		}

		if (!action || action.length === 0) {
			return;
		}

		var elements = helper.get(selector);

		if (!elements || elements.length === 0) {
			return;
		}

		helper.addListeners(elements, action, function (e) {
			trackEvent(e);
		});
	};

	var trackEvents = function () {
		addEvent('input, select, textarea', 'change');
		addEvent('a', 'click');
		addEvent('button', 'click');
	};

	var initialize = function (analyticsProvider) {
		provider = analyticsProvider;
		helper = _tics.helper;

		return helper.isValidProvider(provider);
	};

	return {
		init: initialize,
		page: trackPage,
		events: trackEvents,
		customEvent: addEvent
	};
}());
