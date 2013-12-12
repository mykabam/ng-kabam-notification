ng-kabam-notification
=====================

Notification service for Kabam application

# How to install

## Get it via Bower

To use this directive, fist you need to install it via Bower. I assume you already install the Bower:

```
bower install git+ssh://git@github.com/mykabam/ng-kabam-notification.git
```

**Notice**: This installation method only works if you has access to the repository.

## Include the main scripts

Include the main scripts into your application. Run `bower list --paths` to see the available main scripts:

```
{
  "angular-socket-io": "bower_components/angular-socket-io/socket.js",
  "angular": "bower_components/angular/angular.js",
  "ng-kabam-notification": [
    "bower_components/ng-kabam-notification/src/ng-kabam-notification.js",
    "bower_components/ng-kabam-notification/src/services/notification-factory.js",
    "bower_components/ng-kabam-notification/src/services/web-notification.js",
    "bower_components/ng-kabam-notification/src/controllers/global-notification.js""
  ]
}
```

The scripts listed on `ng-kabam-notification` is the scripts that should be included into your application.

## Add to your application dependency

In order to use the Notification features provided by this module, you must ensure this module is included into your application module dependencies. For examples:

```
angular.module('yourAwesomeApplication', [
  // your application module dependencies
  'ng-kabam-notification'
]);
```