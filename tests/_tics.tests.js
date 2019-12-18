/*global _tics, interceptor, testHelper */

(function () {
	QUnit.module('object initialization');

	QUnit.test('is initialized with one provider', function (assert) {
		var fake = {
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

	var calls;
	var fake;
	var elm;

	QUnit.module('API tests', {
		setup: function () {
			calls = 0;
			var beforeFunc = function () {
				calls += 1;
			};

			fake = interceptor.create({
				trackPage: function () {},
				track: function () {}
			}, ['trackPage', 'track'], beforeFunc);

			elm = testHelper.createInputField('first-name-field');

			_tics.init(fake);
		},
		teardown: function () {
			testHelper.clearAdded();
		}
	});

	QUnit.test('track page was called', function (assert) {
		_tics.page();

		assert.strictEqual(calls, 1);
	});

	QUnit.test('track events was not called by default', function (assert) {
		_tics.events();

		assert.equal(calls, 0);
	});

	QUnit.test('track events called on change', function (assert) {
		_tics.events();

		_tics.helper.trigger('change', elm);

		assert.equal(calls, 1);
	});
}());
