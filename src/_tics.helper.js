var _tics = _tics || {};

_tics.helper = (function () {
	'use strict';

	var almostvanilla = (function () {

		var getBy = function (selector) {
			return window.document.querySelectorAll(selector);
		};

		var triggerEvent = function (eventName, elm) {
			var ev;

			if (document.createEvent) {
				ev = document.createEvent('HTMLEvents');
				ev.initEvent(eventName, true, true);
			} else {
				ev = document.createEventObject();
				ev.eventType = eventName;
			}

			ev.eventName = eventName;

			if (document.createEvent) {
				elm.dispatchEvent(ev);
			} else {
				elm.fireEvent('on' + ev.eventType, ev);
			}
		};

		var getEvent = function (e) {
			if (!e) {
				return window.event;
			}

			return e;
		};

		var getEventTarget = function (e) {
			var evt = getEvent(e);

			if (!e) {
				return evt.srcElement;
			}

			return evt.target;
		};

		var addListenerFor = function (el, eventName, handler) {
			var elmType = el.getAttribute('type');

			if (elmType && elmType === 'hidden') {
				return;
			}

			if (el.addEventListener) {
				el.addEventListener(eventName, handler);
			} else {
				el.attachEvent('on' + eventName, function () {
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

			if (!elm.getAttribute(attrName)) {
				return false;
			}

			return true;
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

		var isArray = function (obj) {
			var func = Object.prototype.toString;
			var expected = func.call([]);

			return func.call(obj) === expected;
		};

		return {
			get: getBy,
			ev: getEvent,
			evTarget: getEventTarget,
			trigger: triggerEvent,
			addListeners: addListenersFor,
			getClosest: getClosestElement,
			isArray: isArray,
			hasAttribute: hasAttribute
		};
	}());

	var startsWith = function (str, suffix) {
		return str.indexOf(suffix) === 0;
	};

	var endsWith = function (str, suffix) {
		return str.lastIndexOf(suffix) === (str.length - suffix.length);
	};

	var isTag = function (elm, tag) {
		if (!elm || !elm.tagName) {
			return false;
		}

		return elm.tagName.toLowerCase() === tag.toLowerCase();
	};

	var isImage = function (elm) {
		return isTag(elm, 'img');
	};

	var isLink = function (elm) {
		return isTag(elm, 'a');
	};

	var isText = function (elm) {
		if (!elm) {
			return false;
		}

		return elm.nodeType === 3;
	};

	var getValueForImage = function (elm) {
		if (isImage(elm) && almostvanilla.hasAttribute(elm, 'alt')) {
			return elm.getAttribute('alt');
		}

		return null;
	};

	var getValueForLink = function (elm) {
		var child;

		if (!elm.firstChild) {
			return null;
		}

		child = elm.firstChild;

		if (isText(child)) {
			return child.nodeValue;
		}

		if (isImage(child)) {
			return getValueForImage(child);
		}

		return null;
	};

	var getValue = function (elm) {
		var val = null;

		if (isLink(elm)) {
			val = getValueForLink(elm);
		}

		if (isImage(elm)) {
			val = getValueForImage(elm);

			if (!val && isLink(elm.parentNode)) {
				elm = elm.parentNode;
			}
		}

		if (val && val.length > 0) {
			return val;
		}

		if (elm.getAttribute('name')) {
			return elm.getAttribute('name');
		}

		if (elm.getAttribute('id')) {
			return elm.getAttribute('id');
		}

		if (elm.getAttribute('href')) {
			return elm.getAttribute('href');
		}

		return '';
	};

	var getUrl = function () {
		return window.location.href;
	};

	var appendTo = function (url, val) {
		var address;
		var query = '';
		var suffix = '/';

		var index = url.indexOf('?');

		if (index === -1) {
			address = url;
		} else {
			address = url.substring(0, index);
			query = url.substring(index, url.length);

			if (!endsWith(val, suffix)) {
				query = suffix + query;
			}
		}

		if (endsWith(address, suffix) || startsWith(val, suffix)) {
			suffix = '';
		}

		return address + suffix + val + query;
	};

	var createUrl = function (elm) {
		var url = getUrl();

		var val = getValue(elm);

		return appendTo(url, val);
	};

	var isJson = function (obj) {
		if (!obj) {
			return false;
		}

		// eslint-disable-next-line no-prototype-builtins
		return obj.hasOwnProperty('data') && obj.hasOwnProperty('isProvisioned');
	};

	var asJson = function (val, provisioned, isValueNotPartial) {
		return {
			data: val,
			isProvisioned: provisioned,
			isPartialData: !isValueNotPartial
		};
	};

	var isProvider = function (obj) {
		return obj && typeof obj.trackPage === 'function' && typeof obj.track === 'function';
	};

	return {
		get: almostvanilla.get,
		ev: almostvanilla.ev,
		evTarget: almostvanilla.evTarget,
		trigger: almostvanilla.trigger,
		addListeners: almostvanilla.addListeners,
		getClosest: almostvanilla.getClosest,
		getCurrentUrl: getUrl,
		createUrlBy: createUrl,
		appendToUrl: appendTo,
		getValueFrom: getValue,
		isTicsJson: isJson,
		asTicsJson: asJson,
		isValidProvider: isProvider,
		isArray: almostvanilla.isArray
	};
}());
