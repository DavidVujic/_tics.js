var _tics = _tics || {};

_tics.functions = (function () {
	'use strict';

	var helper = _tics.helper;

	var funcs = {
		getValue: function (obj) {
			return helper.asTicsJson(obj.elm.value, false);
		},
		getItemInSection: function (obj) {
			var elementIndex = -1;
			var elm = obj.elm;

			var section = helper.getClosest(elm, 'data-section');
			var currentItem = helper.getClosest(elm, 'data-item');

			var items = section.querySelectorAll('[data-item]');
			var i;
			var item;
			var data;

			var url = helper.getCurrentUrl();
			var val = helper.getValueFrom(elm);

			for (i = 0; i < items.length; i += 1) {
				if (items[i] === currentItem) {
					elementIndex = i;
					break;
				}
			}

			item = section.getAttribute('data-section') + '/' + (elementIndex + 1);

			data = helper.appendToUrl(url, item);
			data = helper.appendToUrl(data, val);

			return helper.asTicsJson(data, false, true);
		},
		getRelativeChange: function (obj) {
			var message = 'same';
			var elm = obj.elm;

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

			return helper.asTicsJson(message, false);
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

			if (helper.isTicsJson(result)) {
				return result;
			}

			return helper.asTicsJson(result, handlesProvisioning);
		};
	};

	return {
		get: getFunction,
		add: addFunction
	};
}());
