/*global window:true */

var _tics = _tics || {};

_tics.helper = (function () {
	'use strict';

	var getBy = function (selector) {
		return window.document.querySelectorAll(selector);
	};

	var getEvent = function (e) {
		if (!e) {
			return window.event;
		}
		
		return e;
	};

	var addListenerFor = function (el, eventName, handler) {
		var elmType = el.getAttribute('type');

		if (elmType && elmType === 'hidden') {
			return;
		}

	  if (el.addEventListener) {
	    el.addEventListener(eventName, handler);
	  } else {
	    el.attachEvent('on' + eventName, function() {
	      handler.call(el);
	    });
	  }
	};

	var addListenersFor = function (elements, eventName, handler) {
		var i;

		if (!elements) {
			return;
		}

		for (i = 0; i < elements.length; i += 1) {
			addListenerFor(elements[i], eventName, handler);
		}
	};

	var hasAttribute = function (elm, attrName) {
		if (elm.nodeType !== 1) {
			return false;
		}
		
		var node = elm.getAttributeNode(attrName);

		return (node && node.name === attrName);
	};
	
	var getClosestElement = function (elm, attributeName) {
		var closest = null;
		var parent = elm;
		
		while (parent !== window.document) {
			if (hasAttribute(parent, attributeName)) {
				closest = parent;
				break;
			}
			
			parent = parent.parentNode;
		}
		
		return closest;
	};

	var startsWith = function (str, suffix) {
		return str.indexOf(suffix) === 0;
	};

	var endsWith = function (str, suffix) {
		return str.lastIndexOf(suffix) === (str.length - suffix.length);
	};

	var getValue = function (elm) {
		if (elm.getAttribute('name')) {
			return elm.getAttribute('name');
		}

		if (elm.getAttribute('id')) {
			return elm.getAttribute('id');
		}

		if (elm.getAttribute('href')){
			return elm.getAttribute('href');
		}

		return '';	
	};

	var getUrl = function () {
		return window.location.href;	
	};

	var appendTo = function (url, val) {
		var suffix = '/';

		if (endsWith(url, suffix) || startsWith(val, suffix)) {
			suffix = '';
		}

		return url + suffix + val;
	};

	var createUrl = function (elm) {
		var url = getUrl();

		var val = getValue(elm);

		return appendTo(url, val);
	};
	
	return {
		get: getBy,
		ev: getEvent,
		addListeners: addListenersFor,
		getClosest: getClosestElement,
		createUrlBy: createUrl,
		appendToUrl: appendTo,
		getValueFrom: getValue
	};
}());