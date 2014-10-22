/*global window:true */

var _tics = _tics || {};

_tics.gaProvider = (function () {
	'use strict';

	var isInitialized = false;

	var helper = null;
	var functions = null;
	var account = null;
	var domain = null;

	var runCustomFunction = function (elm) {		
		var funcName = elm.getAttribute('data-val-analyze-custom');
		var func;
		
		if (!funcName) {
			return null;
		}

		func = functions.get(funcName);

		if (typeof func !== 'function') {
			return null;
		}
		
		return func.apply(null, [elm, window.ga]);
	};

	var sendTrackingFor = function (elm, ev) {
		if (!isInitialized) {
			return;
		}

		var url = helper.createUrlBy(elm);
		var category = elm.tagName;
		var action = ev.type;
		var label = helper.getValueFrom(elm);
		
		var result = runCustomFunction(elm);

		if (result) {
			if(result.isProvisioned) {
				return;
			}

			if (result.isPartialData) {
				url = helper.appendToUrl(url, result.data);	
			} else {
				url = result.data;
			}
		}

		window.ga('send', 'pageview', url);
		window.ga('send', 'event', category, action, label);
	};
	
	var setDefaults = function () {
		if (!isInitialized) {
			return;
		}

		window.ga('create', account, domain);
		window.ga('send', 'pageview');
	};

	var initialize = function (gaAccount) {
		if (!gaAccount || !gaAccount.account || !gaAccount.domain) {
			return;
		}

		helper = _tics.helper;
		functions = _tics.functions;

		account = gaAccount.account;
		domain = gaAccount.domain;

		isInitialized = true;
	};

	return {
		init: initialize,
		trackPage: setDefaults,
		track: sendTrackingFor
	};
}());