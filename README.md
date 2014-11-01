_tics.js
========

This is a simple JavaScript helper library for writing web analytics client side code. It supports basic page tracking and also event tracking for form fields, buttons and links.

**_tics.js** is intended to give you a head start with web analytics and it supports the Google Universal Analytics JavaScript library out of the box. Included is a Google Analytics provider, written as a separate module. It can easily be replaced by a custom provider consuming your favorite web analytics tool.

#Usage#

##The "it just works" scenario
Initialize the library and provider:

```javascript
// initialize the provider
 _tics.gaProvider.init({
    account: my-google-account-id,
    domain: my-google-account-domain
});
    
// add the provider       
 _tics.init(_tics.gaProvider);

// enable basic page tracking
_tics.page();

// and/or enable form fields, buttons and link tracking
_tics.events();
```

##The "couldn't you just do this?" scenario
If you want to grab the actual value of a specific form field, decorate your element with an attribute (data-val-analyze-custom):
```html
<input type="text" id="my-field" name="my-field" data-val-analyze-custom="getValue" />
```

Decorate your element with the following attributes if you want to get the relative change in a numeric field:
```html
<input type="text" id="my-field" name="my-field" data-val-analyze-custom="getRelativeChange" data-val-original-value="100" />
```

The function will return "higher", "lower" or "same" when comparing the changes with the original value.

When you want to track which item in a list of items users have clicked, decorate your element with:
```html
<a name="my-menu-item" href="/mypage/" data-val-analyze-custom="getItemInSection">Item 1</a>
```

and decorate the containers with data attributes (data-section and data-item):
```html
<div data-section="Column 2">
    <ul>
        <li data-item>
             <a name="my-menu-item" href="/mypage/" data-val-analyze-custom="getItemInSection">Item 1</a>
        </li>
    </ul>
</div>
```

This usage is for the event tracking features of **_tics.js**:
```javascript
_tics.events();
```

##The "extra special for you" scenario
The **getValue**, **getRelativeChange** and **getItemInSection** functions are included in **_tics.js**. Add your custom function by appending them to the library. Use your favorite library for traversing the DOM if you like.

```javascript
_tics.functions.add('getMyCustomValue', function (obj) {
	return $('my-selector').val();
});
```

If you don't want the library to perform the defaults, just pass "true" (treated as already provisioned) as a parameter to the add function. 

```javascript
_tics.functions.add('getType', function (obj) {
    
    // do whatever you like here

}, true);
```

If you want to override or hijack one of the existing functions, just call the add function and use the same name as one of the built in functions. If you want to grab the current analytics service, the callback function will provide you with it as a property of the obj parameter.

```javascript
// the obj parameter:
// obj.elm is the current element
// obj.ev is the current event
// obj.service is the current analytics service, used by the provider
_tics.functions.add('getValue', function (obj) {
    obj.service('send', 'hello world');
    obj.service('send', 'my custom function');
}, true);
```

```javascript
_tics.functions.add('myOverrideOfGetValue', function (obj) {
	var func = _tics.functions.get('getValue');

	// returns a json object {data: string, isProvisioned : true/false }
	var result = func(obj);

	return result.data + '-mysuffix';
});
```

Add any event not covered by the built in features, by calling the customEvent function passing a selector and the event action:

```javascript
_tics.customEvent('select', 'focus');
```

**Note:**
If you use jQuery and need to trigger an event on a field that _tics is listening to,
please note that the jQuery trigger function does not fire events added with plain vanilla JavaScript (this library is using addEventListener to hook up events).

You can then use:

```javascript
_tics.helper.trigger('change', myElement);
```