# Personal Site

This is the code used for my personal github page. Feel free to take anything you like.

## Testing

All tests are written in [Jasmine.js](http://pivotal.github.com/jasmine/) and can be found under the spec directory.

To view the results of the tests you need to startup Jasmine's test server.

	$ rake jasmine

## Language

For fun I put in some [Jison](http://zaach.github.com/jison/) code to create a page navigation language.

You can generate the JS parser by using jison to compile the .jison language file.

	$ jison javascripts/lang/navigation.jison -o javascripts/lang/navigation.js
