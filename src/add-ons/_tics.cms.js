var _tics = _tics || {};

_tics.cms = (function () {
	'use strict';

	var helper = _tics.helper;

	var findFuncName = function (name, query) {
		var funcName = null;

		if (!name) {
			return null;
		}

		if (name.lastIndexOf(query, 0) === 0) {
			funcName = name.slice(query.length + 1);
		}

		return funcName;
	};

	var getFuncNameFrom = function (names, query) {
		var funcName = null;
		var i;

		if (!names) {
			return null;
		}
		
		for (i = 0; i < names.length; i += 1) {
			funcName = findFuncName(names[i], query);
		}

		return funcName;
	};

	var getClassNamesFrom = function (elm) {
		if(!elm || !elm.className) {
			return null;
		}
		
		return elm.className.split(' ');
	};

	var modifyElement = function (elm, prefix) {
		var classNames = getClassNamesFrom(elm);
		var funcName = getFuncNameFrom(classNames, prefix);

		if (!funcName) {
			return;
		}

		elm.setAttribute('data-val-' + prefix, funcName);
		elm.setAttribute('data-val-original-value', elm.value);
	};

	var fromClassNameToDataAttribute = function () {
		var prefix = 'analyze-custom';
		var elements = helper.get('[class*="' + prefix + '"]');
		var i;

		if (!elements) {
			return;
		}

		for (i = 0; i < elements.length; i += 1) {
			modifyElement(elements[i], prefix);
		}
	};

	return {
		prepareForm: fromClassNameToDataAttribute
	};
}());