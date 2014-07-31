---
layout: post
title: .tdd with angular
description: A quick look at setting up a painless testing process using Angular.js.
image: https://angularjs.org/img/AngularJS-large.png
---


# Introduction
I find it difficult to use TDD methodology while creating browser based applications. In Rails there are many options but the basis of a Rails application is different than an application where the majority of the logic is in the browser. With Rails I have a single request and response for the majority of use cases whereas using a client side Javascript framework gives me the freedom to have pages updated without refreshing the browser.

Client side application testing raises an issue with how to fake out interactions of someone using the application. Many times I would feel satisfied with Unit tests and clicking over the site 17 times for every change I made. Without the full suite of tests I found myself falling prey to the same bug on multiple occasions. Using client side javascript frameworks was fun but in the end I created software which was more prone to bugs until now.

Recently I was introduced to Angular.js while working on a small startup project. I chose Angular primarily because it has many pieces which are designed around the idea of being testable. The first I came across was `$httpbackend` which is similar to the project [WebMock](https://github.com/bblimke/webmock) for Ruby based projects. The fact that they made a HTTP mock framework core in their design perked my interest.

Building a project using TDD and Angular turned out to be an absolute joy and I want to share how I approached it.

An example project I setup while writing this can be found on [My GitHub](https://github.com/eerwitt/angular-testing-scaffold).

# Initial Setup

I began my project by looking at some common modules found in a few popular Angular projects.

coffee-script
: Of course

karma
: Runs the tests with a chrome browser in the background

karma-coffee-preprocessor
: Turn coffee into JS tests

karma-chrome-launcher
: "with a chrome browser"

karma-jasmine
: This was an accidental choice, usually I use Mocha but after experiencing Jasmine I prefer it due to how easy it was to setup and run. Mocha has more choices but keeping it simple was helpful later.

protractor
: For running end-to-end tests, these are larger tests than the Karma tests and take longer to execute.

http-server
: Seriously easy to have a directory hosted in a minimal web server.

bower
: It is nice to have a list of random third-party JS libraries in one spot. Otherwise a jQuery update turns into two days of frustration.

With those dependencies installed I began by setting up my directory structure to be used with the tests. Each library will do this setup different so I tried to follow a layout I have seen in a number of Angular projects.

~~~
/project-root/web
  - .gitignore
  - bower.json
  - package.json
  - app
    - index.html
    - js
      - app.coffee
      - controllers.coffee
      - models.coffee
    - partials
      - github.html
    - bower_components
  - test
    - karma.conf.js
    - protractor-conf.js
    - unit
      - github.coffee
    - e2e
      - scenarios.coffee
  - bower_components
  - node_modules
~~~

__NOTE__ I don't fully support the idea of all controllers, models or services located in a single file. I prefer them separated out but to start with this layout worked well. Using Grunt can come in handy putting together all the individual controllers, models and services.

# Tests

The testing in Angular applications is broken down to a few different frameworks working together. Each framework can be used independently but for this example I am using them together. For most projects I find that I need each piece eventually.

Test Runner
: A test runner will bootstrap a test environment and run the actual tests with the program code in scope. For this project I am using Karma but there are [many more runners available](http://stackoverflow.com/questions/300855/javascript-unit-test-tools-for-tdd).

Test Framework
: A test framework gives methods to evaluate if a given assertion is true or not. Many test frameworks attempt to be as human readable as possible. For this project I used Jasmine but there are [many to choose from](http://en.wikipedia.org/wiki/List_of_unit_testing_frameworks#JavaScript).

End to End (e2e)
: The e2e tests build on top of the unit tests by testing features as they are connected together. Commonly these tests may be considered integration tests or behaviors. For this project I found Protractor to be an easy solution since it is setup to work with Angular. There are other choices but for someone new to Angular I feel this is the best option.

# Unit Tests

The unit tests are ran via Karma and are written in Jasmine. Each test is supposed to be as simple and isolated as possible. I believe that unit tests should never rely on external services or share state between calls unless absolutely necessary.

Since I rely heavily on unit tests I like to make sure they are easy to run and fast.

## Configure NPM Commands for Unit Testing

Once I had a basic layout I went about adding commands to be used with NPM in order to keep myself from having to recall numerous command line options. To start with I setup the testing related commands in the `package.json` file so that I can run `npm test` and not worry about running installation steps before.

{% highlight javascript %}
{
  // ... Clipped package installation information ...
  "scripts": {
    "pretest": "npm install",
    "test": "node node_modules/karma/bin/karma start test/karma.conf.js",
    "test-single-run": "node node_modules/karma/bin/karma start test/karma.conf.js  --single-run",
  }
}
{% endhighlight %}

pretest
: This script is executed before running the test script. It is usually a good call to make sure a fresh `npm install` is ran before tasks.

test
: This task runs the unit tests or specs. I use the binary under `node_modules` to avoid having to install Karma globally.

test-single-run
: Karma by default starts and watches code for changes; any changes start the tests again. This will run Karma once against the current tests then exit. I find this task useful when checking tests after a merge.

# Integration or End-to-End (e2e) Tests

The integration tests take a little longer to run which shouldn't matter. My "tdd-loop" follows more of a "bdd-tdd-loop" where I start at a vague description of the feature I want to see and then drill down to the individual components which make up that feature. This means that I can have an integration test which fails for an hour while I am writing the components which make up that feature.

## Configure NPM Commands for End-to-End Testing

At this point I want the e2e tests to run as automatically as the unit tests do. In order to do that I update the `package.json` again to add in the new tests.

{% highlight javascript %}
{
  // ... Clipped package installation information ...
  "scripts": {
    // ... Clipped scripts information from above ...

    "prestart": "npm install; coffee -w -c ./app/*/*.coffee &",
    "start": "node_modules/http-server/bin/http-server -p 8000",

    "preupdate-webdriver": "npm install",
    "update-webdriver": "webdriver-manager update",

    "preprotractor": "npm run update-webdriver",
    "protractor": "protractor test/protractor-conf.js"
  }
}
{% endhighlight %}

prestart
: This will install modules and then compile any coffee-script files. The coffee-script compilation shouldn't be done like this in production and instead be replaced by a deployment task. For now this is a simple way to get the coffee-script compiled.

start
: Since this application is all client side we start the application by starting a web server and serving the HTML.

preupdate-webdriver
: Before updating the webdriver component we need to make sure all the required modules are installed.

update-webdriver
: This will download the standalone Selenium server used in the tests in order to create a real browser session.

preprotractor
: We need to make sure Selenium is installed before running the actual e2e tests, this will run the task above.

protractor
: The last step for an e2e test is running protractor which will then execute the individual e2e tests against a real browser session controlled by Selenium.

__NOTE__ With Protractor I have to have the server running which I accomplish by doing an `npm start` in an alternate terminal session.

# Build a Feature

I think it is important to focus on a feature when writing software. By focusing on a feature I am able to connect the people I am building the software to the machine running the software.

For these tests I am going to start with the feature idea of showing my GitHub name and location.

## First e2e Test

I am starting out by creating a test which describes opening up the default page and showing my GitHub username.

{% highlight coffeescript %}
describe "Angular Test Scaffold", ->
  it "displays my GitHub name", ->
    browser.get("app/index.html").then ->
      expect(element(By.css("#githubName")).getText()).toBe("Erik Erwitt")
{% endhighlight %}

This test uses `browser.get(...` in order to open the browser to the applications entry page. In Protractor this will return a promise, when that promise is resolved I write the main test using Jasmine.

expect
: A Jasmine helper.

element
: Element is coming from Protractor and associated with the rendered element in on the HTML page.

By
: This is usually `by` when using Protractor with JS tests but `by` is a keyword in coffee-script. In order to avoid the name collision I used `By` instead, this method creates a selector to find the element on the page. In this case I am looking for an element which has an id of `githubName`.

getText
: Instead of checking that the element is an element I want to check the content of that element. This method is a shortcut to get the actual text rendered on the page.

toBe
: This is also from Jasmine and used for equality checks.

At this point the test will fail so I am going to move on to writing a unit test before implementing the actual code.

## First Unit Test

At this point I know my feature requires some information from GitHub in order for the e2e test to pass. In my e2e task I am OK with the external service being hit directly but in this case I don't want to go out to GitHub each time my tests run. To get around this issue I take advantage of `$httpBackend`.

{% highlight coffeescript %}
  $httpBackend = null

  beforeEach module('angularTestingScaffoldApp')

  beforeEach inject( (_$httpBackend_) ->
    $httpBackend = _$httpBackend_
  )

  beforeEach ->
    $httpBackend.
      when(
        'GET',
        'https://api.github.com/users/eerwitt').
      respond(
        name: "Erik"
        location: "Berkeley")

  afterEach ->
    $httpBackend.verifyNoOutstandingExpectation()
    $httpBackend.verifyNoOutstandingRequest()
{% endhighlight %}

There are no tests yet so I am going to make a test for a non-existent model which I will use to retrieve my GitHub information.

{% highlight coffeescript %}
  # Now initialize a module
  $httpBackend = GitHub = null

  # And add it to the injector
  beforeEach inject( (_$httpBackend_, _GitHub_) ->
    $httpBackend = _$httpBackend_
    GitHub = _GitHub_
  )

  # The actual test
  it 'requests my personal details from github', ->
    success = jasmine.createSpy('success')

    GitHub.getUserInfo().then(success)

    $httpBackend.flush()

    expect(success).toHaveBeenCalledWith(name: "Erik", location: "Berkeley")
{% endhighlight %}

jasemine.createSpy
: This is used to create a fake function so that we can check if it was called appropriately in the `.then` call.

then
: I want the `getUserInfo` to return a promise which can then be used in the test.

$httpBackend.flush()
: Until `.flush()` is called the HTTP requests will not be allowed to return.

toHaveBeenCalledWith
: Using the spy created above we are now able to check what the parameters were to it when it was called during the resolution of the promise.

This test still won't pass but it describes the basic layout of what I need in order to implement the feature I described above. In a larger project the amount of `$httpBackend` calls may get too large. There are a few solutions which can be used to place all the `$httpBackend` calls into a single place or a factory.

## Complete Cycle

At this point I have some tests but no implementation. Reading these tests gives me the basic layout of what I need to create. I need to create a class with one class method which returns a promise; that promise is passed in an object with a `name` and `location` when it is resolved.

{% highlight coffee-script %}
angularTestingScaffoldModels = angular.module "angularTestingScaffoldModels", []

angularTestingScaffoldModels.factory "GitHub", ["$http", "$q", ($http, $q) ->
  class GitHub
    constructor: (@name, @location) ->

    @getUserInfo: ->
      defer = $q.defer()

      success = (response) ->
        details = new GitHub(
          response.data.name,
          response.data.location)

        defer.resolve details

      error = (errors) ->
        defer.reject errors

      $http(method: "GET", url: "https://api.github.com/users/eerwitt").then(success, error)

      defer.promise
]
{% endhighlight %}

Now the tests should pass. None of this code is great but it passes the tests. Later I would hope that pieces like the hard coded URL would get removed and replaced with settings written by Grunt.

With the feature implemented all my tests should pass and I can go about adding a new feature and following the same cycle.

# Conclusion

Testing in Angular is something I enjoy a great deal. It is easy to get setup while being robust in features.
