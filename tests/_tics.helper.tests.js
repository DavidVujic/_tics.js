/*global QUnit, _tics */

(function () {

	QUnit.module('_tics.helper API tests');

	QUnit.test('append to url', function (assert) {
		var expected = 'http://www.github.com/theValue';
		var url = 'http://www.github.com';
		var val = 'theValue';

		var result = _tics.helper.appendToUrl(url, val);

		assert.strictEqual(result, expected, 'strictEqual');
	});

	QUnit.test('append to url with slash', function (assert) {
		var expected = 'http://www.github.com/theValue';
		var url = 'http://www.github.com/';
		var val = 'theValue';

		var result = _tics.helper.appendToUrl(url, val);

		assert.strictEqual(result, expected, 'strictEqual');
	});

	QUnit.test('append to url with querystring', function (assert) {
		var expected = 'http://www.github.com/theValue/?hello=world';
		var url = 'http://www.github.com?hello=world';
		var val = 'theValue';

		var result = _tics.helper.appendToUrl(url, val);

		assert.strictEqual(result, expected, 'strictEqual');
	});

	QUnit.test('append to url with querystring with slash', function (assert) {
		var expected = 'http://www.github.com/theValue/?hello=world';
		var url = 'http://www.github.com?hello=world';
		var val = 'theValue/';

		var result = _tics.helper.appendToUrl(url, val);

		assert.strictEqual(result, expected, 'strictEqual');
	});
}());
