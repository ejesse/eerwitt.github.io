---
layout: post
title: .replacing r with d3
description: R is a fantastic solution for doing statistical analysis but I feel it is time to update my process to use a more rigorous technique.
image: /images/r-icon.jpg
---

# Introduction

I have always used [R](http://www.r-project.org/) and in particular [Rmd](http://rmarkdown.rstudio.com/) when doing any exploratory analysis in order to create reproducible results.

R was a major step forward from the process of having a large directory of scripts in multiple languages which output CSV information to be loaded into Excel... At this point I believe it is time to make another change due to some fundamental issues which are not being addressed in R workflows.

The major drawbacks I experience with R projects are.
  * There is no requirement to describe how the dataset was obtained. It is good practice to list the original location but there is no requirement.
  * R projects change often and are kept in sync with version and date numbers appended to the file. After a few revisions this becomes a nightmare to try and understand.
  * As more analysis is added to the R scripts there is no way to verify the assumptions about the data being analysed is still true. (There is no way to test it)
  * R scripts often end up in one large incomprehensible file.

These are all common problems in software development which I believe have been solved. In software development we write the program which downloads the original dataset, we use git (or other revision control systems), we rely on test coverage reports and we modularize code.

With these ideas in mind I am adjusting my R workflow to follow my development workflow.

# A Different Approach

My new approach is to extract, transform, load and analyse information using [D3.js](http://d3js.org/). This allows me to have a quick turnaround for interactive illustrations while building the analysis using thorough testing.

# My Setup

I like to have things run continually and live. Each time I change a line of code I like to see it reflected immediately. In order to accomplish this I rely on `npm`, `grunt` and `bower`.

## NPM Setup

My base `package.json` looks something like this.

~~~ javascript
{
  // ... meta data about this package ...
  "devDependencies": {
    "bower": "*",
    "coffee-script": "*",
    "grunt": "*",
    "grunt-cli": "*",
    "grunt-contrib-coffee": "*",
    "grunt-contrib-connect": "^0.8.0",
    "grunt-contrib-watch": "^0.6.1",
    "q": "*"
  },
  "scripts": {
    "postinstall": "bower install"
  }
}
~~~

bower
: I use bower in order to keep track of the javascript dependencies required for the web interface like D3 and NVD3.

coffee-script
: My personal preference is to use coffee-script over javascript. Either works fine.

grunt
: I hate having to type in multiple commands while working, grunt allows me to easily run all my required commands whenever files change so I can live edit.

grunt-cli
: This package installs a `grunt` command, I usually do this globally as well `npm install -g grunt-cli`.

grunt-contrib-coffee
: Grunt module to compile coffee-script to javascript.

grunt-contrib-connect
: In order to work with d3 I need a live site, this allows me to have a quick development webserver to use.

grunt-contrib-watch
: This is the grunt plugin which watches files for changes and will execute a command. In my case I will compile coffee-script and reload the page in my browser.

q
: Not required but often I need a promise instead of getting stuck in a callback hell.

This is the basic layout but `grunt` and `bower` both require additional configuration.

## Bower Setup

Bower is powered by `bower.json` and is setup as follows.

~~~ javascript
{ 
  // ... project meta data ...
  "dependencies": {
    "jquery": "1.11.1",
    "d3": "latest",
    "nvd3": "latest"
  }
}
~~~

jquery
: Maybe by habit I include `jQuery` by default... It is useful for doing `.getJSON` requests which return promises instead of the d3 callback approach.

d3
: The latest version of d3 is used to build visualizations, parse information and convert different types.

nvd3
: This library is useful when creating basic graphs for initial explorations. It lacks tests and is often broken between versions of d3 so I don't completely trust it.

## Grunt Setup

Grunt is powered by a Gruntfile, in my case I am using `Gruntfile.coffee`.

~~~ coffee
module.exports = (grunt) ->
  grunt.initConfig
    connect:
      server:
        port: 8000
        base: './web'
    coffee:
      compile:
        files:
          'web/js/main.js': ['web/app/**/*.coffee']
    watch:
      coffee:
        options:
          livereload: true
        files: ['web/app/**/*.coffee', 'web/**/*.html']
        tasks: ['coffee']

  grunt.loadNpmTasks 'grunt-contrib-connect'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  grunt.registerTask 'default', ['connect', 'watch']
~~~

This Gruntfile will setup three different pieces.

connect
: Initializes a basic webserver which hosts the directory specified by `base`.

coffee
: Compiles the different coffee-script files into a single javascript file which can be included in a page.

watch
: Whenever a `.coffee` or `.html` file changes this will compile the coffee-script and reload my open browser tab.

default
: Using `grunt.registerTask 'default', ['connect', 'watch']` will say that by default I want to run both those tasks, this allows me to run `grunt` with no parameters and let it do what I need it to.

# Conclusion

This is a basic setup, I haven't included any testing information but this will get a project started. Using this my workflow is more difficult than using R in [Rstudio](http://www.rstudio.com/) but it allows me a great deal of freedom. This process forces me to follow an approach which will have reproducible results and is easily shared with others over the web.
