_tics.js
========

This is a simple helper JavaScript library for writing web analytics client side code. It adds support for basic page tracking and also event tracking for form fields, buttons and links.

**_tics.js** is intended to give you a head start with web analytics and it supports the Google Universal Analytics JavaScript library (https://developers.google.com/analytics/devguides/collection/analyticsjs/) out of the box. There is a "ga provider" included in the library, written as a separate module. It can easily be replaced by a custom provider using your favorite web analytics library.

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

##The "could we just do this?" scenario
If you want to grab the actual value of a specific form field, decorate your element with an attribute:
<input type="text" id="my-field" name="my-field" data-val-analyze-custom="getValue" />

Decorate your element with the following attribute if you want to get the relative change in a numeric field:
<input type="text" id="my-field" name="my-field" data-val-analyze-custom="getRelativeChange" data-val-original-value="100" />

The function will return "higher", "lower" or "same" when comparing the changes with the original value.

When you want to track which item in a list of items users have clicked, decorate your element with:
<a name="my-menu-item" href="/mypage/" data-val-analyze-custom="getItemInSection">Item 1</a>

and the containers:
<div data-section="Column 2">
    <ul>
        <li data-item>
             <a name="my-menu-item" href="/mypage/" data-val-analyze-custom="getItemInSection">Item 1</a>
        </li>
    </ul>
</div>

##The "extra special for you" scenario
The **getValue**, **getRelativeChange** and **getItemInSection** functions comes with **_tics.js** out of the box. Add your custom function by appending them to the library. Use your favorite library for traversing the DOM if you like.

```javascript
_tics.functions.add('getType', function (elm) {
	window.ga('send', 'hello world');
	window.ga('send', 'my custom function');
});
```

If you don't want the library to perform the defaults, just pass "true" (treated as already provisioned) as a parameter to the add function. 

```javascript
_tics.functions.add('getType', function (elm) {
    window.ga('send', 'hello world');
    window.ga('send', 'my custom function');
}, true);
```

If you want to override or hijack one of the existing functions, just call the add function and use the same name as one of the built in functions. If you want to grab the current provider, the callback function will provide you with it as a second parameter.

```javascript
_tics.functions.add('getValue', function (elm, provider) {
    window.ga('send', 'hello world');
    window.ga('send', 'my custom function');
});
```