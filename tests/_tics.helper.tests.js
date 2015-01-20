/*global test:true, module:true, strictEqual:true, _tics: true */

(function () {
	
	module('_tics.helper API tests');

	test('append to url', function () {
		var expected = 'http://www.github.com/theValue';
		var url = 'http://www.github.com';
		var val = 'theValue';

		var result = _tics.helper.appendToUrl(url, val);

		strictEqual(result, expected, 'strictEqual');
	});

	test('append to url with slash', function () {
		var expected = 'http://www.github.com/theValue';
		var url = 'http://www.github.com/';
		var val = 'theValue';

		var result = _tics.helper.appendToUrl(url, val);

		strictEqual(result, expected, 'strictEqual');
	});

	test('append to url with querystring', function () {
		var expected = 'http://www.github.com/theValue/?hello=world';
		var url = 'http://www.github.com?hello=world';
		var val = 'theValue';

		var result = _tics.helper.appendToUrl(url, val);

		strictEqual(result, expected, 'strictEqual');
	});

}());