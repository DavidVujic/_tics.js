/*global window:true */

var _tics = _tics || {};

_tics.fake = (function () {
	'use strict';

	var counter = 0;

	return function (gaAction, type, content, action, label) {

		var container = window.document.querySelector('.log-container');

		var message;
		var urlLastPart = '';
		var start = 0;

		if (type === 'event') {
			message = gaAction + ' ' + type + ' ' + content + ' ' + action + ' ' + label;
		} else if (gaAction === 'create'){
			message = gaAction + ' ' + type + ' ' + content;
		} else {
			if (content) {
				
				if (content.toLowerCase().indexOf('files') !== -1) {
					start = content.toLowerCase().indexOf('files') + 5;
				}

				if (content.toLowerCase().indexOf('http://') !== -1) {
					start = content.toLowerCase().indexOf('http://') + 7;
				}
				
				urlLastPart = content.substring(start, content.length);
			}
			
			message = gaAction + ' ' + type + ' ' + urlLastPart;
		}

		if (console && console.log) {
			console.log(message);
			return;
		}
		
		if (counter > 1) {
			container.innerHTML = '';
			counter = 0;	
		}
		
		var messageNode = window.document.createTextNode(message);      
		var rowNode = window.document.createElement('br');

		container.appendChild(messageNode);
		container.appendChild(rowNode);

		counter += 1;
	};
}());