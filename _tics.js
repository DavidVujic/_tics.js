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

	var trackEvents = function () {
		var fields = helper.get('input, select, textarea');
		var links = helper.get('a');
		var buttons = helper.get('button');

		helper.addListeners(fields, 'change', function (e) {
			trackEvent(e);
		});

		helper.addListeners(links, 'click', function (e) {
			trackEvent(e);
		});

		helper.addListeners(buttons, 'click', function (e) {
			trackEvent(e);
		});
	};

	var addCustomEvent = function (selector, action) {
		var elements = helper.get(selector);

		if (!elements || elements.length === 0) {
			return;
		}

		helper.addListeners(elements, action, function (e) {
			trackEvent(e);
		});
	};

	var initialize = function (analyticsProvider) {
		provider = analyticsProvider;
		helper = _tics.helper;
	};

	return {
		init: initialize,
		page: trackPage,
		events: trackEvents,
		customEvent: addCustomEvent
	};
}());