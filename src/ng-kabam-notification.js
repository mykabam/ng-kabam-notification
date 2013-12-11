/**
 * @overview Web Notification service for Kabam application
 * @ngdoc service
 *
 * @description service that carry out specific tasks like
 * requesting permission, checking the notification permission status,
 * so this Notification service kinda like a wrapper to access the
 * Web Notification.
 *
 * Notes on Google Chrome usage:
 * There's one very important caveat about requesting permission:
 * the page can only request permission when a user initiates some action on
 * a page, in this case, clicking on a button. So, when using this directive
 * only click event will work best on Google Chrome, otherwise will not be
 * working as expected.
 */
angular.module('ng-kabam-notification', [
  // 3rd party dependencies
  'btford.socket-io'
])
  .config(['socketProvider',
    function(socketProvider) {
      var kabamSocket = io.connect();
      // do stuff with kabamSocket
      socketProvider.ioSocket(kabamSocket);
    }
  ]);