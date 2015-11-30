/*global test:true, module:true, strictEqual:true, ok:true, _tics: true, interceptor:true, calls:true, logger:true, testHelper:true */

(function () {
	var fake;

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
		setup: function () {
			fake = interceptor.add({
				trackPage: function () {},
				track: function () {}
			}, [calls.add, logger.add]);

			testHelper.createInputField('first-name-field');
		},
		teardown: function () {
			fake = null;
			testHelper.clearAdded();
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
}());
