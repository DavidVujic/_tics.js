/*global window:true */

var _tics = _tics || {};

_tics.functions = (function () {
	'use strict';

	var helper = _tics.helper;
	
	var isJson = function (obj) {
		if (!obj) {
			return false;
		}
		
		return obj.hasOwnProperty('data') && obj.hasOwnProperty('isProvisioned');
	};
	
	var asJson = function (val, provisioned) {
		return {
			data: val,
			isProvisioned: provisioned
		};
	};

	var funcs = {
		getValue: function (elm) {
			return asJson(elm.value, false);
		},
		getItemInSection: function (elm) {
			var elementIndex = -1;
			
			var section = helper.getClosest(elm, 'data-section');
			var currentItem = helper.getClosest(elm, 'data-item');

			var items = section.querySelectorAll('[data-item]');
			var i;

			for (i = 0; i < items.length; i += 1) {
				if (items[i] === currentItem) {
					elementIndex = i;
					break;
				}
			}

			var item = section.getAttribute('data-section') + '/' + (elementIndex + 1);

			return asJson(item, false);
		},
		getRelativeChange: function (elm) {			
			var message = 'same';
			
			var dataVal = elm.getAttribute('data-val-original-value');
			
			var originalValue = parseInt(dataVal, 10);
			var newValue = parseInt(elm.value, 10);
			
			if (window.isNaN(originalValue) || window.isNaN(newValue)) {
				message = 'undefined';
			} else {
				if (newValue > originalValue) {
					message = 'higher';
				} else if (newValue < originalValue) {
					message = 'lower';
				}
			}

			return asJson(message, false);
		}
	};

	var getFunction = function (funcName) {
		var func = funcs[funcName];

		if (typeof func !== 'function') {
			return null;
		}

		return func;
	};

	var addFunction = function (funcName, func, handlesProvisioning) {
		funcs[funcName] = function (elm, ga) {
			var result = func(elm, ga);
			
			if (isJson(result)) {
				return result;
			}

			return asJson(result, handlesProvisioning);
		};
	};

	return {
		get: getFunction,
		add: addFunction
	};
}());