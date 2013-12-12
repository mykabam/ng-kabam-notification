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

# Notes on Notification Payload Structures

## Broadcast Notification

When your application server send broadcast notification,
ng-kabam-notification only able to handle it if the payload is similar with the
following data structure:

```
{
  message: 'Hi'
}
```

## Default Notification

When your application server send default notification,
ng-kabam-notification only able to handle it if the payload is similar with the
following data structure:

```
{
  user: {
    username: 'user2'
  },
  message: {
    from: 'user1',
    text: 'Hi'
  },
  type: 'default'
}
```

## Call Notification

When your application server send call notification,
ng-kabam-notification only able to handle it if the payload is similar with the
following data structure:

```
{
  user: {
    username: 'callee'
  },
  message: {
    callee: 'callee',
    caller: 'caller',
    roomId: '34e971f0-7b67-4506-8f96-9855163477fc'
  },
  type: 'call'
}
```
