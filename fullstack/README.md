# Software Engineering with Node.js

This is meant to be a skeleton that shows good practices in node.js enterprise development.

* Server Technologies
    * express.js - web framework
    * Feature based file structure !(not yet)
* Client Technologies
    * SASS - css generation technology
    * angular.js - Single Page application framework by google
    * bootstrap - Starting css for modern ui
    * angular-strap/ui - integrate bootstrap with angular
    * Feature based file structure !(not yet)
* Database
    * mongo - nosql database
    * mongoose - ORM for mongo
* Code Quality
    * style guide (via README)
    * jshint - Enforced linting
    * jsdoc - code documenation !(not yet)
    * istanbul - code coverage !(not yet)
    * plato - code visualization !(not yet)
* Testing
    * nodeunit/mocha !(not yet)
    * Automated execution of test on js file change !(not yet)
* Automation
    * bower - web component package management (for angular.js, bootsrap)
    * gulp - build system for development and deployment
    * gulp-inject - Auto inserting script tags for development
* Optimizations
    * css minification
    * js minification
    * js combining
    * js gzip !(not yet)
    * img compression !(not yet)


# To Run

    # Install required software
    brew install node
    brew install mongo

    # Install node libraries
    npm install

    # Start mongod in new terminal
    mongod
    # Run gulp in new terminal
    gulp
    # Run node server in new terminal
    node server.js


http://sahatyalkabov.com/create-a-tv-show-tracker-using-angularjs-nodejs-and-mongodb/?utm_source=javascriptweekly&utm_medium=email


# OS Tools
==============================================================================

Mac - homebrew (http://brew.sh/)

# Build system
==============================================================================

## gulp
build system as code

files:

  * gulpfile.js

To execute the development server. This compiles and copies all assets into the /public directory and executes the express.js server. It restarts the server if a file changes. It will dynamically include all javascript into the index.html file.

    $ gulp

To create a deployable distribution that combines and uglifies all javascript. Compiles sass to css and minifies. Creates templates for angular app. compresses images.

    $ gulp dist


## npm
node package manager

files:

  * package.json
  * node_modules

## bower
package management for any software. used for twitter bootstrap and angular

files:

  * bower.json
  * bower_components

# Code Quality
==============================================================================

## Code Style Guide
"Arguments over style are pointless. There should be a style guide, and you should follow it"
- Rebecca Murphey

Popular Style Guides:

  * Crockford (http://javascript.crockford.com/code.html)
  * Google (https://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml)
  * jQuery Core Style Guide (https://contribute.jquery.org/style-guide/js/)
  * idiomatic.js (https://github.com/rwaldron/idiomatic.js)

## Automated Tests
junit

## Linting
gulp-jshint

## Code Coverage
Istanbul

## Code Documentation
gulp-jsdoc

## Code Visualization
plato (https://github.com/es-analysis/plato)


# Server
==============================================================================

## Web Framework
express.js

## Database
mongodb
mongoose

# Client
==============================================================================
angular.js

## Angular UI directives
bootstrap vs foundation: bootstrap is more popular and supported by angular-ui (right now)
http://bootsnipp.com/
http://bootswatch.com/
angular-ui vs angular-strap: ui is supported by google

navbar example: http://plnkr.co/edit/qPeBaVUyr5cH6QOV5WF5?p=preview

https://groups.google.com/forum/#!topic/angular/omB_cv2KAxc
Using angular-ui for following reasons in the email from Pawel:

1) Size of dependencies and libraries itself
4) Community effort vs. mostly one-person effort
5) Support from the AngularJS core team


## Style Sheets
sass vs less
gulp-sass vs gulp-ruby-sass: going with simpler gulp-sass for now.
gulp-csso

Source Maps:
https://medium.com/what-i-learned-building/getting-started-with-css-sourcemaps-and-in-browser-sass-editing-b4daab987fb0

## Javascript
gulp-uglify
gulp-concat


# Debugging
==============================================================================
node-inspect
