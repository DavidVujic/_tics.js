/*global window:true */

var _tics = _tics || {};

_tics.gaProvider = (function () {
	'use strict';

	var isInitialized = false;

	var ga = null;
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
		
		return func.apply(null, [elm, ga]);
	};

	var sendTrackingFor = function (elm, ev) {
		if (!isInitialized) {
			return;
		}

		var url = helper.createUrlBy(elm);
		var category = elm.tagName;
		var action = ev.type;
		var label = helper.getValueFrom(elm);
		
		var result = runCustomFunction(elm, ga);

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

		ga('send', 'pageview', url);
		ga('send', 'event', category, action, label);
	};
	
	var setDefaults = function () {
		if (!isInitialized) {
			return;
		}

		ga('create', account, domain);
		ga('send', 'pageview');
	};

	var initialize = function (gaAccount) {
		if (!gaAccount || !gaAccount.account || !gaAccount.domain) {
			return;
		}

		ga = window.ga;
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