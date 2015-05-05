var _tics = _tics || {};

_tics.cms = (function () {
	'use strict';

	var helper = _tics.helper;

	var getClassNamesFrom = function (element) {
		return element.className.split(' ');
	};

	var findFuncName = function (name, query) {
		var funcName = null;

		if (name.lastIndexOf(query, 0) === 0) {
			funcName = name.slice(query.length + 1);
		}

		return funcName;
	};

	var getFuncNameFrom = function (names, query) {
		var funcName = null;
		var i;

		for (i = 0; i < names.length; i += 1) {
			funcName = findFuncName(names[i], query);
		}

		return funcName;
	};

	var modify = function (element, prefix) {
		var classNames = getClassNamesFrom(element);

		var funcName = getFuncNameFrom(classNames, prefix);

		element.setAttribute('data-val-' + prefix, funcName);
	};

	var fromClassNameToDataAttribute = function () {
		var prefix = 'analyze-custom';
		var elements = helper.get('[class*="' + prefix + '"]');
		
		var i;

		for (i = 0; i < elements.length; i += 1) {
			modify(elements[i], prefix);
		}
	};

	return {
		classNameToData: fromClassNameToDataAttribute
	};
}());