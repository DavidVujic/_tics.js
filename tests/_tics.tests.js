/*global QUnit, _tics, interceptor, calls, logger, testHelper */

(function () {
	var fake;

	QUnit.module('object initialization');

	QUnit.test('is global object added', function (assert) {
		assert.ok(_tics, 'ok');
	});

	QUnit.test('is initialized with one provider', function (assert) {
		fake = {
			trackPage: function () {},
			track: function () {}
		};

		assert.strictEqual(_tics.init(fake), true, 'strictEqual');
	});

	QUnit.test('is initialized with a list of providers', function (assert) {
		var fakes = [{
			trackPage: function () {},
			track: function () {}
		}, {
			trackPage: function () {},
			track: function () {}
		}];

		assert.strictEqual(_tics.init(fakes), true, 'strictEqual');
	});

	QUnit.module('API tests', {
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

	QUnit.test('track page was called', function (assert) {
		_tics.init(fake);
		_tics.page();

		assert.strictEqual(fake.trackPage.calls, 1, 'strictEqual');
	});

	QUnit.test('track events should not be called until change', function (assert) {
		_tics.init(fake);
		_tics.events();

		assert.strictEqual(fake.track.calls, 0, 'strictEqual');
	});

	QUnit.test('track events was called', function (assert) {
		_tics.init(fake);
		_tics.events();

		var elm = window.document.getElementById('first-name-field');
		elm.value = 'hello world';

		_tics.helper.trigger('change', elm);

		assert.strictEqual(fake.track.calls, 1, 'strictEqual');
	});
}());
