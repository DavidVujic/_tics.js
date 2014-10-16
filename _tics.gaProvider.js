/*global window:true */

var _tics = _tics || {};

_tics.gaProvider = (function () {
	'use strict';

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
		var url = helper.createUrlBy(elm);
		var category = elm.tagName;
		var action = ev.type;
		var label = helper.getValueFrom(elm);
		
		var result = runCustomFunction(elm);

		if (result) {
			if(result.isProvisioned) {
				return;
			}
			
			url = helper.appendToUrl(url, result.data);	
		}

		ga('send', 'pageview', url);
		ga('send', 'event', category, action, label);
	};
	
	var setDefaults = function () {
		ga('create', account, domain);
		ga('send', 'pageview');
	};

	var initialize = function (gaAccount) {
		ga = window.ga;
		helper = _tics.helper;
		functions = _tics.functions;

		account = gaAccount.account;
		domain = gaAccount.domain;

		if (!account || !domain) {
			return;
		}
	};

	return {
		init: initialize,
		trackPage: setDefaults,
		track: sendTrackingFor
	};
}());