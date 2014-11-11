/*global test:true, module:true, strictEqual:true, ok:true, _tics: true, interceptor:true, calls:true */

var fake = null;

module('object initialization');

test('is global object added', function () {
	ok(_tics, 'ok');
});

test('is initialized', function () {

	fake = {
		trackPage: function () {},
		track: function () {}
	};

	strictEqual(_tics.init(fake), true, 'strictEqual');
});

module('API tests', {
	setup: function() {
		fake = interceptor.add({
			trackPage: function () {},
			track: function () {}
		}, calls.add);

		var input = window.document.createElement('input');
		input.type = 'text';
		input.className = 'element-added';
		input.id = 'first-name-field';

		window.document.getElementsByTagName('body')[0].appendChild(input);
	}, teardown: function() {
		fake = null;
		var elementsAdded = window.document.querySelectorAll('.element-added');
		var i;

		for(i = 0; i < elementsAdded.length; i += 1) {
			elementsAdded[i].parentNode.removeChild(elementsAdded[i]);
		}

	}
});

test('track page was called', function () {
	_tics.init(fake);
	_tics.page();

	strictEqual(fake.trackPage.calls, 1, 'strictEqual');
});

test('track events should not be called until change', function () {
	_tics.init(fake);
	_tics.events();
	
	strictEqual(fake.track.calls, 0, 'strictEqual');
});

test('track events was called', function () {
	_tics.init(fake);
	_tics.events();

	var elm = window.document.getElementById('first-name-field');
	elm.value = 'hello world';

	_tics.helper.trigger('change', elm);
	
	strictEqual(fake.track.calls, 1, 'strictEqual');
});